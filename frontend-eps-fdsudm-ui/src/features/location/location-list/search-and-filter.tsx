import { Button, Section, Select, TextInput } from "@emorg-prd/standard-react";
import { useState } from "react";
import styles from "./search-and-filter.module.css";

const StandardTextInput = TextInput as unknown as (props: any) => JSX.Element;
const StandardSelect = Select as unknown as (props: any) => JSX.Element;

export type FilterOption = {
    label: string;
    value: string;
};

export type LocationFilterValues = {
    zone: string;
    country: string;
    site: string;
    name: string;
    city: string;
    streetAddress: string;
    status: string;
    isReal: string;
};

type SearchAndFilterProps = {
    zoneOptions: FilterOption[];
    countryOptions: FilterOption[];
    siteOptions: FilterOption[];
    cityOptions: FilterOption[];
    statusOptions: FilterOption[];
    onZoneChange: (zoneId: string) => void;
    onCountryChange: (countryId: string) => void;
    onSearch: (values: LocationFilterValues) => void;
};

const initialValues: LocationFilterValues = {
    zone: "",
    country: "",
    site: "",
    name: "",
    city: "",
    streetAddress: "",
    status: "",
    isReal: "",
};

function getTextInputValue(value: unknown): string {
    if (typeof value === "string") {
        return value;
    }

    if (value && typeof value === "object" && "target" in value) {
        const target = (value as { target?: { value?: unknown } }).target;
        return typeof target?.value === "string" ? target.value : "";
    }

    return "";
}

export function SearchAndFilter({
    zoneOptions,
    countryOptions,
    siteOptions,
    cityOptions,
    statusOptions,
    onZoneChange,
    onCountryChange,
    onSearch,
}: SearchAndFilterProps) {
    const [values, setValues] = useState(initialValues);

    const updateValue = (key: keyof LocationFilterValues, value: string) => {
        setValues((currentValues) => ({ ...currentValues, [key]: value }));
    };

    const clearFilters = () => {
        setValues(initialValues);
        onSearch(initialValues);
    };

    const handleCountryChange = (countryId: string) => {
        setValues((currentValues) => ({
            ...currentValues,
            country: countryId,
            city: "",
            site: "",
        }));
        onCountryChange(countryId);
    };

    const handleZoneChange = (zoneId: string) => {
        setValues((currentValues) => ({
            ...currentValues,
            zone: zoneId,
            country: "",
            city: "",
            site: "",
        }));
        onZoneChange(zoneId);
    };

    const handleSiteChange = (siteId: string) => {
        setValues((currentValues) => ({
            ...currentValues,
            site: siteId,
        }));
    };

    return (
        <Section
            type="em-c-section--expandable"
            title="Search and Filter"
            optionalClass={styles.filterPanel}
        >
            <div className={styles.filterBody}>
                    <div className={styles.filterGrid}>
                        <FilterSelect label="Zones" value={values.zone} options={zoneOptions} onChange={handleZoneChange} />
                        <FilterSelect label="Country" value={values.country} options={countryOptions} onChange={handleCountryChange} />
                        <FilterSelect label="Site" value={values.site} options={siteOptions} onChange={handleSiteChange} />
                        <StandardTextInput
                            id="location-name"
                            label="Name"
                            value={values.name}
                            onChange={(value: unknown) => updateValue("name", getTextInputValue(value))}
                            placeholder="Location name..."
                            optionalClass={styles.standardField}
                        />
                        <FilterSelect label="City" value={values.city} options={cityOptions} onChange={(value) => updateValue("city", value)} />
                        <StandardTextInput
                            id="street-address"
                            label="Street Address"
                            value={values.streetAddress}
                            onChange={(value: unknown) => updateValue("streetAddress", getTextInputValue(value))}
                            placeholder="Street address..."
                            optionalClass={styles.standardField}
                        />
                        <FilterSelect label="Status" value={values.status} options={statusOptions} onChange={(value) => updateValue("status", value)} />
                        <FilterSelect label="Is Real" value={values.isReal} options={[{ label: "true", value: "true" }, { label: "false", value: "false" }]} onChange={(value) => updateValue("isReal", value)} />
                    </div>
                    <div className={styles.actions}>
                        <Button
                            type="em-c-btn--primary"
                            size="em-c-btn--small"
                            typeAttribute="button"
                            label="Search"
                            onClick={() => onSearch(values)}
                        />
                        <Button
                            type="em-c-btn--secondary"
                            size="em-c-btn--small"
                            typeAttribute="button"
                            label="Clear"
                            onClick={clearFilters}
                        />
                    </div>
            </div>
        </Section>
    );
}

type FilterSelectProps = {
    label: string;
    value: string;
    options: FilterOption[];
    onChange: (value: string) => void;
};

function FilterSelect({ label, value, options, onChange }: FilterSelectProps) {
    return (
        <StandardSelect
            id={`location-filter-${label.toLowerCase().replaceAll(" ", "-")}`}
            label={label}
            value={value}
            onChange={onChange}
            optionalClass={styles.standardField}
        >
            <option value="">All</option>
            {options.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </StandardSelect>
    );
}
