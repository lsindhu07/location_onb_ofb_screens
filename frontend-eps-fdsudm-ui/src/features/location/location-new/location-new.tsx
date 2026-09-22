import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { PageHeaderWrapper } from "@/components/common/page-header/page-header";
import { LoadingSpinner } from "@/components/common/loading-spinner/loading-spinner";
import { DynamicForm, type DynamicFormField } from "@/components/common/dynamic-form";
import { LocationApiService } from "@/services/location-api.service";
import type { LocationRecord } from "@/models/api/location-dto";
import { LocationRecordTabs } from "@/features/location/location-record/location-record-tabs";
import styles from "./location-new.module.css";

const locationFormSections = [
    {
        legend: "Location details",
        legendIcon: "location-arrow",
        twoColumned: true,
        fields: [
            {
                name: "location_name",
                label: "Location Name",
                type: "text",
                required: true,
                placeholder: "Enter location name",
                validation: { minLength: 2 },
            },
            {
                name: "location_desc",
                label: "Location Description",
                type: "text",
                placeholder: "Enter location description",
            },
            {
                name: "type",
                label: "Type of Location",
                type: "select",
                required: true,
                options: [
                    { label: "Select type", value: "" },
                    { label: "Store", value: "Store" },
                    { label: "Warehouse", value: "Warehouse" },
                    { label: "Distribution Center", value: "Distribution Center" },
                ],
            },
            {
                name: "primaryUseServiceType",
                label: "Primary Use / Service Type",
                type: "select",
                required: true,
                options: [
                    { label: "Select service type", value: "" },
                    { label: "Retail Service", value: "Retail Service" },
                    { label: "Distribution Service", value: "Distribution Service" },
                    { label: "Support Service", value: "Support Service" },
                ],
            },
            {
                name: "isReal",
                label: "Is Real",
                type: "select",
                required: true,
                options: [
                    { label: "Select option", value: "" },
                    { label: "Yes", value: "Yes" },
                    { label: "No", value: "No" },
                ],
            },
            {
                name: "country",
                label: "Country",
                type: "select",
                required: true,
                options: [
                    { label: "Select country", value: "" },
                    { label: "United States", value: "United States" },
                    { label: "Canada", value: "Canada" },
                    { label: "India", value: "India" },
                ],
            },
            {
                name: "stateProvince",
                label: "State / Province",
                type: "text",
                placeholder: "Enter state or province",
            },
            {
                name: "city",
                label: "City",
                type: "text",
                required: true,
                placeholder: "Enter city",
            },
            {
                name: "streetAddress",
                label: "Street Address",
                type: "text",
                placeholder: "Enter street address",
            },
            {
                name: "postalCode",
                label: "Zip / Postal Code",
                type: "text",
                placeholder: "Enter zip or postal code",
            },
        ] as DynamicFormField[],
    },
    {
        legend: "Business Line",
        legendIcon: "building",
        twoColumned: true,
        fields: [
            {
                name: "businessLine",
                label: "Business Line",
                type: "select",
                required: true,
                options: [
                    { label: "Select business line", value: "" },
                    { label: "Retail", value: "Retail" },
                    { label: "Distribution", value: "Distribution" },
                    { label: "Logistics", value: "Logistics" },
                ],
            },
            {
                name: "siteManager",
                label: "Who will manage the site",
                type: "select",
                required: true,
                options: [
                    { label: "Select owner", value: "" },
                    { label: "Operations Team", value: "Operations Team" },
                    { label: "Retail Team", value: "Retail Team" },
                    { label: "Shared Services", value: "Shared Services" },
                ],
            },
            {
                name: "commercialPortfolioManager",
                label: "Commercial Portfolio Manager",
                type: "text",
                placeholder: "Enter manager name",
            },
            {
                name: "estimatedAnnualOpExBudgetUsd",
                label: "Estimated Annual OpEx Budget (USD)",
                type: "text",
                required: true,
                placeholder: "Enter amount",
            },
        ] as DynamicFormField[],
    }
];

const emptyLocation: LocationRecord = {
    location_id: "",
    location_name: "",
    location_street_address_1: "",
    location_city: "",
    business_line_id: "",
    location_desc: "",
    status: "Active",
};

const locationFieldKeys = [
    "location_name",
    "location_desc",
    "type",
    "primaryUseServiceType",
    "isReal",
    "country",
    "stateProvince",
    "city",
    "streetAddress",
    "postalCode",
    "businessLine",
    "siteManager",
    "commercialPortfolioManager",
    "estimatedAnnualOpExBudgetUsd",
] as const;

type LocationFormProps = {
    locationId?: string;
};

export function LocationCreate({ locationId }: LocationFormProps) {
    const navigate = useNavigate();
    const isEditMode = Boolean(locationId);

    const [location, setLocation] = useState<LocationRecord>(emptyLocation);
    const [isLoading, setIsLoading] = useState(isEditMode);

    useEffect(() => {
        if (!locationId) {
            return;
        }
        LocationApiService.getLocationById(locationId).then((existingLocation) => {
            if (existingLocation) {
                setLocation(existingLocation);
            }
            setIsLoading(false);
        });
    }, [locationId]);

    const formValues = Object.fromEntries(
        locationFieldKeys.map((fieldName) => [fieldName, String((location as Record<string, string>)[fieldName] ?? "")])
    ) as Record<string, string>;

    const handleDynamicFieldChange = (fieldName: string, value: string) => {
        setLocation((current) => ({ ...current, [fieldName]: value }));
    };

    const handleCancel = () => {
        navigate({ to: "/location" });
    };

    const handleSubmit = async () => {
        const locationToSave: LocationRecord = isEditMode
            ? location
            : { ...location, location_id: `L-${Date.now()}` };

        await LocationApiService.saveLocation(locationToSave);
        navigate({ to: "/location" });
    };

    if (isLoading) {
        return <LoadingSpinner size="m" />;
    }

    // Editing an existing location record now shows the tabbed layout agreed in
    // the HTML wireframe (Site, Location Details, Building, Parcel, Accounting)
    // instead of a single flat form — see LocationRecordTabs. Creating a brand
    // new location keeps the single-form flow below: there's no location_id yet
    // for the Site/Building/Parcel tabs to attach anything to.
    if (isEditMode && locationId) {
        return (
            <div style={{ display: "grid", width: "100%", gap: "1.5rem" }} className={styles.pageShell}>
                <PageHeaderWrapper title="Edit Location" subtitle="Update the details for this location." />
                <LocationRecordTabs locationId={locationId} location={location} onLocationSaved={setLocation} />
            </div>
        );
    }

    return (
        <div style={{ display: "grid", width: "100%", gap: "1.5rem" }} className={styles.pageShell}>
            <PageHeaderWrapper
                title="Create Location"
                subtitle="Set up the location profile, site information, and business ownership in a single form."
            />

            <DynamicForm
                sections={locationFormSections}
                values={formValues}
                onChange={handleDynamicFieldChange}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                submitLabel="Save"
                cancelLabel="Cancel"
                wrapperClassName={styles.formShell}
                sectionClassName={styles.formSection}
                actionsClassName={styles.formActions}
            />
        </div>
    );
}
