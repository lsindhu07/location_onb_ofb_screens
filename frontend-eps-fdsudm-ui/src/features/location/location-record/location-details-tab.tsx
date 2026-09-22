import { useEffect, useMemo, useState } from "react";
import {
    DynamicForm,
    type DynamicFormField,
    type DynamicFormOption,
    type DynamicFormSection,
} from "@/components/common/dynamic-form";
import { LoadingSpinner } from "@/components/common/loading-spinner/loading-spinner";
import { LocationApiService } from "@/services/location-api.service";
import type { LocationRecord, UpdateLocationRequest } from "@/models/api/location-dto";
import {
    loadLocationDetailLookups,
    loadSubdivisionOptions,
    type LocationDetailLookups,
} from "./location-lookups";
import styles from "./location-record.module.css";

const YES_NO: DynamicFormOption[] = [
    { label: "Select a value…", value: "" },
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
];

// location_primary_use_type_name isn't loaded on the location record itself —
// only the id is. We resolve the selected option's label from the lookup list
// to decide whether to show the retail-only Fuel/Store Brand fields, same as
// the togglePrimaryUseBrandFields() logic in the earlier HTML wireframes.
function isRetailUseType(useTypeId: string, primaryUseTypes: DynamicFormOption[]): boolean {
    const label = primaryUseTypes.find((option) => option.value === useTypeId)?.label ?? "";
    return label.toLowerCase().includes("retail");
}

type LocationDetailsTabProps = {
    locationId: string;
    location: LocationRecord;
    onSaved: (updated: LocationRecord) => void;
};

export function LocationDetailsTab({ locationId, location, onSaved }: LocationDetailsTabProps) {
    const [lookups, setLookups] = useState<LocationDetailLookups | null>(null);
    const [values, setValues] = useState<Record<string, string>>({});
    const [subdivisionOptions, setSubdivisionOptions] = useState<DynamicFormOption[]>([]);
    const [isSaving, setIsSaving] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);

    useEffect(() => {
        loadLocationDetailLookups().then(setLookups);
    }, []);

    useEffect(() => {
        setValues({
            location_name: location.location_name ?? "",
            location_desc: location.location_desc ?? "",
            is_real_flag: location.is_real_flag === undefined ? "" : location.is_real_flag ? "Yes" : "No",
            ref_sap_location_code: location.ref_sap_location_code ?? "",
            location_operation_type_id: location.location_operation_type_id?.toString() ?? "",
            location_primary_use_type_id: location.location_primary_use_type_id?.toString() ?? "",
            operation_status_id: location.operation_status_id?.toString() ?? "",
            country: "",
            country_subdivision_id: location.country_subdivision_id?.toString() ?? "",
            location_city: location.location_city ?? "",
            location_street_address_1: location.location_street_address_1 ?? "",
            location_street_address_2: location.location_street_address_2 ?? "",
            location_postal_code: location.location_postal_code ?? "",
            location_lat: location.location_lat?.toString() ?? "",
            location_long: location.location_long?.toString() ?? "",
            cpm_id: location.cpm_id?.toString() ?? "",
            cost_center: location.cost_center ?? "",
            business_line_id: location.business_line_id ?? "",
            ownership_percentage: location.ownership_percentage?.toString() ?? "",
            fuel_brand_id: location.fuel_brand_id?.toString() ?? "",
            store_brand_id: location.store_brand_id?.toString() ?? "",
        });
    }, [location]);

    const handleChange = (fieldName: string, value: string) => {
        setValues((current) => ({ ...current, [fieldName]: value }));

        if (fieldName === "country") {
            setValues((current) => ({ ...current, country_subdivision_id: "" }));
            loadSubdivisionOptions(value).then(setSubdivisionOptions);
        }
    };

    const isPhysical = values.is_real_flag === "Yes";
    const isRetail = lookups ? isRetailUseType(values.location_primary_use_type_id, lookups.primaryUseTypes) : false;

    const sections = useMemo<DynamicFormSection[]>(() => {
        if (!lookups) return [];

        const addressRequired = isPhysical;

        return [
            {
                legend: "Location Details",
                legendIcon: "location-arrow",
                twoColumned: true,
                fields: [
                    { name: "location_name", label: "Location Name", type: "text", required: true },
                    { name: "location_desc", label: "Location Description", type: "text" },
                    { name: "is_real_flag", label: "Is Real", type: "select", required: true, options: YES_NO },
                    { name: "ref_sap_location_code", label: "SAP Location Code", type: "text", required: true },
                    {
                        name: "location_operation_type_id",
                        label: "Location Operational Type",
                        type: "select",
                        required: true,
                        options: lookups.operationTypes,
                    },
                    {
                        name: "location_primary_use_type_id",
                        label: "Primary Use / Service Type",
                        type: "select",
                        required: true,
                        options: lookups.primaryUseTypes,
                    },
                    {
                        name: "operation_status_id",
                        label: "Operational Status",
                        type: "select",
                        required: true,
                        options: lookups.operationStatuses,
                    },
                    { name: "country", label: "Country (used to find State/Province)", type: "select", options: lookups.countries },
                    {
                        name: "country_subdivision_id",
                        label: "State/Province",
                        type: "select",
                        required: addressRequired,
                        options: subdivisionOptions,
                        note: subdivisionOptions.length === 0 ? "Pick a country above to load State/Province options." : undefined,
                    },
                    { name: "location_city", label: "City", type: "text", required: addressRequired },
                    { name: "location_street_address_1", label: "Street Address 1", type: "text", required: addressRequired },
                    { name: "location_street_address_2", label: "Street Address 2", type: "text" },
                    { name: "location_postal_code", label: "Postal Code / Zip", type: "text", required: addressRequired },
                    { name: "location_lat", label: "Latitude", type: "text", required: addressRequired },
                    { name: "location_long", label: "Longitude", type: "text", required: addressRequired },
                    { name: "cpm_id", label: "Commercial PM", type: "select", options: lookups.contacts },
                    { name: "cost_center", label: "Cost Center", type: "text", required: addressRequired },
                    { name: "business_line_id", label: "Business Line", type: "select", options: lookups.businessLines },
                    { name: "ownership_percentage", label: "Ownership % (0-1)", type: "text" },
                ] as DynamicFormField[],
            },
            ...(isRetail
                ? [
                      {
                          legend: "Retail Brands",
                          twoColumned: true,
                          fields: [
                              { name: "fuel_brand_id", label: "Fuel Brand", type: "select", required: true, options: lookups.fuelBrands },
                              { name: "store_brand_id", label: "Store Brand", type: "select", required: true, options: lookups.storeBrands },
                          ] as DynamicFormField[],
                      },
                  ]
                : []),
        ];
    }, [lookups, isPhysical, isRetail, subdivisionOptions]);

    const handleSubmit = async () => {
        setSaveError(null);
        setIsSaving(true);
        try {
            const body: UpdateLocationRequest = {
                location_name: values.location_name,
                location_desc: values.location_desc || null,
                location_street_address_1: values.location_street_address_1 || null,
                location_street_address_2: values.location_street_address_2 || null,
                location_city: values.location_city || null,
                location_postal_code: values.location_postal_code || null,
                location_lat: values.location_lat ? Number(values.location_lat) : null,
                location_long: values.location_long ? Number(values.location_long) : null,
                operation_status_id: Number(values.operation_status_id),
                country_subdivision_id: values.country_subdivision_id ? Number(values.country_subdivision_id) : null,
                location_operation_type_id: Number(values.location_operation_type_id),
                ownership_percentage: values.ownership_percentage ? Number(values.ownership_percentage) : 1,
                cost_center: values.cost_center || null,
                ref_sap_location_code: values.ref_sap_location_code,
                cpm_id: values.cpm_id ? Number(values.cpm_id) : null,
                location_primary_use_type_id: Number(values.location_primary_use_type_id),
                fuel_brand_id: values.fuel_brand_id ? Number(values.fuel_brand_id) : null,
                store_brand_id: values.store_brand_id ? Number(values.store_brand_id) : null,
                business_line_id: values.business_line_id ? Number(values.business_line_id) : null,
                security_level_id: location.security_level_id ?? 0,
                managed_space_flag: location.managed_space_flag ?? false,
                is_real_flag: values.is_real_flag === "Yes",
            };

            const updated = await LocationApiService.updateLocation(locationId, body);
            onSaved(updated);
        } catch (error) {
            setSaveError(error instanceof Error ? error.message : "Failed to save location details.");
        } finally {
            setIsSaving(false);
        }
    };

    if (!lookups) {
        return <LoadingSpinner size="m" />;
    }

    return (
        <div className={styles.tabPanel}>
            {saveError && <div className={styles.errorBanner}>{saveError}</div>}
            <DynamicForm
                sections={sections}
                values={values}
                onChange={handleChange}
                onSubmit={handleSubmit}
                submitLabel={isSaving ? "Saving…" : "Save changes"}
            />
        </div>
    );
}
