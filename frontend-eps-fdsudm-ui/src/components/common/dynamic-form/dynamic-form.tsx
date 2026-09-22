import { useState } from "react";
import { Button, Fieldset, Icon, Select, TextInput } from "@emorg-prd/standard-react";
import styles from "./dynamic-form.module.css";

export type DynamicFormFieldType = "text" | "select";

const EMORGTextInput = TextInput as unknown as (props: any) => JSX.Element;
const EMORGSelect = Select as unknown as (props: any) => JSX.Element;

export type DynamicFormOption = {
  label: string;
  value: string;
};

export type DynamicFormValidationRule = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | undefined;
};

export type DynamicFormField = {
  name: string;
  label: string;
  type: DynamicFormFieldType;
  placeholder?: string;
  required?: boolean;
  note?: string;
  options?: DynamicFormOption[];
  columnSpan?: 1 | 2;
  validation?: DynamicFormValidationRule;
};

export type DynamicFormSection = {
  legend?: string;
  legendIcon?: string;
  twoColumned?: boolean;
  fields: DynamicFormField[];
};

type DynamicFormProps = {
  fields?: DynamicFormField[];
  sections?: DynamicFormSection[];
  values: Record<string, string>;
  onChange: (fieldName: string, value: string) => void;
  onSubmit?: () => void | Promise<void>;
  onCancel?: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  legend?: string;
  twoColumned?: boolean;
  hideActions?: boolean;
  wrapperClassName?: string;
  sectionClassName?: string;
  actionsClassName?: string;
};

function joinClassNames(...classNames: Array<string | undefined | false>) {
  return classNames.filter(Boolean).join(" ");
}

function resolveChangeValue(nextValue: unknown): string {
  const isPrimitive = (value: unknown): value is string | number | boolean =>
    typeof value === "string" || typeof value === "number" || typeof value === "boolean";

  if (isPrimitive(nextValue)) {
    return String(nextValue);
  }

  if (!nextValue || typeof nextValue !== "object") {
    return "";
  }

  const candidate =
    (nextValue as { target?: { value?: unknown } }).target?.value ??
    (nextValue as { value?: unknown }).value;

  return isPrimitive(candidate) ? String(candidate) : "";
}

function validateFieldValue(field: DynamicFormField, value: string): string | undefined {
  const safeValue = value ?? "";
  const required = field.required ?? field.validation?.required ?? false;

  if (required && safeValue.trim().length === 0) {
    return `${field.label} is required.`;
  }

  if (field.validation?.minLength && safeValue.length < field.validation.minLength) {
    return `${field.label} must be at least ${field.validation.minLength} characters.`;
  }

  if (field.validation?.maxLength && safeValue.length > field.validation.maxLength) {
    return `${field.label} must be less than ${field.validation.maxLength + 1} characters.`;
  }

  if (field.validation?.pattern && safeValue && !field.validation.pattern.test(safeValue)) {
    return `${field.label} is not in a valid format.`;
  }

  if (field.validation?.custom) {
    return field.validation.custom(safeValue);
  }

  return undefined;
}

export function DynamicForm({
  fields,
  sections,
  values,
  onChange,
  onSubmit,
  onCancel,
  submitLabel = "Save",
  cancelLabel = "Cancel",
  legend,
  twoColumned = false,
  hideActions = false,
  wrapperClassName,
  sectionClassName,
  actionsClassName,
}: DynamicFormProps) {
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const resolvedFields = fields ?? sections?.flatMap((section) => section.fields) ?? [];

  const updateFieldValue = (field: DynamicFormField, value: string) => {
    onChange(field.name, value);

    if (touchedFields[field.name]) {
      const validationMessage = validateFieldValue(field, value);
      setErrors((currentErrors) => ({
        ...currentErrors,
        [field.name]: validationMessage ?? "",
      }));
    }
  };

  const validateAllFields = () => {
    const nextErrors: Record<string, string> = {};

    resolvedFields.forEach((field) => {
      const value = values[field.name] ?? "";
      const validationMessage = validateFieldValue(field, value);

      if (validationMessage) {
        nextErrors[field.name] = validationMessage;
      }
    });

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleBlur = (field: DynamicFormField) => {
    setTouchedFields((current) => ({
      ...current,
      [field.name]: true,
    }));

    const validationMessage = validateFieldValue(field, values[field.name] ?? "");
    setErrors((currentErrors) => ({
      ...currentErrors,
      [field.name]: validationMessage ?? "",
    }));
  };

  const handleSubmitClick = async () => {
    const isValid = validateAllFields();
    if (!isValid) {
      return;
    }

    if (onSubmit) {
      await onSubmit();
    }
  };

  const renderField = (field: DynamicFormField) => {
    const fieldValue = values[field.name] ?? "";
    const fieldError = errors[field.name];

    if (field.type === "select") {
      const selectOptions = field.options ?? [];

      return (
        <EMORGSelect
          key={field.name}
          id={field.name}
          label={field.label}
          name={field.name}
          value={fieldValue}
          required={field.required}
          state={fieldError ? "em-has-error" : undefined}
          note={fieldError || field.note}
          optionalClass={styles.inputField}
          onChange={(newValue: unknown) => updateFieldValue(field, resolveChangeValue(newValue))}
          onBlur={() => handleBlur(field)}
        >
          {selectOptions.length > 0 ? (
            selectOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))
          ) : (
            <option value="">Select an option</option>
          )}
        </EMORGSelect>
      );
    }

    return (
      <EMORGTextInput
        key={field.name}
        id={field.name}
        label={field.label}
        name={field.name}
        value={fieldValue}
        placeholder={field.placeholder}
        required={field.required}
        state={fieldError ? "em-has-error" : undefined}
        note={fieldError || field.note}
        optionalClass={styles.inputField}
        onChange={(newValue: unknown) => updateFieldValue(field, resolveChangeValue(newValue))}
        onBlur={() => handleBlur(field)}
      />
    );
  };

  const formGroups = sections && sections.length > 0
    ? sections
    : [{ legend, fields: resolvedFields, twoColumned }];

  return (
    <div className={joinClassNames(styles.formRoot, wrapperClassName)}>
      {formGroups.map((group, index) => (
        <div
          key={group.legend ?? `fieldset-${index}`}
          className={joinClassNames(styles.section, sectionClassName)}
        >
          {group.legend && (
            <div
              className={joinClassNames(
                styles.sectionHeader,
                group.legendIcon && styles.sectionHeaderWithIcon,
              )}
            >
              {group.legendIcon && (
                <Icon
                  name={group.legendIcon as any}
                  size="em-c-icon--medium"
                  optionalClass={styles.sectionHeaderIcon}
                />
              )}
              <span>{group.legend}</span>
            </div>
          )}

          <Fieldset optionalClass={styles.sectionFieldset}>
            <div className={styles.sectionBody}>
              {group.twoColumned ? (
                <div className={styles.twoColumnGrid}>
                  {group.fields.map((field) => (
                    <div
                      key={field.name}
                      className={joinClassNames(
                        styles.fieldSlot,
                        field.columnSpan === 2 && styles.fieldFullWidth,
                      )}
                    >
                      {renderField(field)}
                    </div>
                  ))}
                </div>
              ) : (
                group.fields.map((field) => renderField(field))
              )}
            </div>
          </Fieldset>
        </div>
      ))}

      {!hideActions && (
        <div className={joinClassNames(styles.actions, actionsClassName)}>
          {onCancel && (
            <Button size="em-c-btn--small" type="em-c-btn--secondary" label={cancelLabel} onClick={onCancel} />
          )}
          {onSubmit && <Button size="em-c-btn--small" type="em-c-btn--primary" label={submitLabel} onClick={handleSubmitClick} />}
        </div>
      )}
    </div>
  );
}

export default DynamicForm;

                    