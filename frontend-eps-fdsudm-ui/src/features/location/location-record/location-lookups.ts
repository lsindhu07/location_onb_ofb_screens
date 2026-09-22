import { MasterDataApiService, type LookupRecord } from "@/services/master-data-api.service";
import type { DynamicFormOption } from "@/components/common/dynamic-form";

export type LocationDetailLookups = {
    operationStatuses: DynamicFormOption[];
    businessLines: DynamicFormOption[];
    primaryUseTypes: DynamicFormOption[];
    operationTypes: DynamicFormOption[];
    contacts: DynamicFormOption[];
    countries: DynamicFormOption[];
    fuelBrands: DynamicFormOption[];
    storeBrands: DynamicFormOption[];
};

// Every lookup table (operation_status, business_line, ...) is exposed as
// "SELECT * FROM dbo.<table>" (see SqlLookupHelper on the API), so each row's
// id/name columns are its own table's naming — hence the per-call idKeys/nameKeys.
export function toOptions(records: LookupRecord[], idKeys: string[], nameKeys: string[]): DynamicFormOption[] {
    return records
        .map((record) => {
            const id = idKeys.map((key) => record[key]).find((v) => v !== undefined && v !== null);
            const name = nameKeys.map((key) => record[key]).find((v) => v !== undefined && v !== null) ?? id;
            return id === undefined ? undefined : { value: String(id), label: String(name) };
        })
        .filter((option): option is DynamicFormOption => option !== undefined);
}

export async function loadLocationDetailLookups(): Promise<LocationDetailLookups> {
    const [
        operationStatuses,
        businessLines,
        primaryUseTypes,
        operationTypes,
        contacts,
        countries,
        fuelBrands,
        storeBrands,
    ] = await Promise.all([
        MasterDataApiService.getOperationStatuses(),
        MasterDataApiService.getBusinessLines(),
        MasterDataApiService.getLocationPrimaryUseTypes(),
        MasterDataApiService.getLocationOperationTypes(),
        MasterDataApiService.getContacts(),
        MasterDataApiService.getCountries(),
        MasterDataApiService.getFuelBrands(),
        MasterDataApiService.getStoreBrands(),
    ]);

    const contactOptions = contacts
        .map((contact) => {
            const id = contact.contact_id;
            if (id === undefined || id === null) return undefined;
            const fullName = [contact.first_name, contact.last_name].filter(Boolean).join(" ").trim();
            return { value: String(id), label: fullName || String(id) };
        })
        .filter((option): option is DynamicFormOption => option !== undefined);

    return {
        operationStatuses: toOptions(operationStatuses, ["operation_status_id"], ["operation_status_name"]),
        businessLines: toOptions(businessLines, ["business_line_id"], ["business_line_name"]),
        primaryUseTypes: toOptions(primaryUseTypes, ["location_primary_use_type_id"], ["location_primary_use_type_name"]),
        operationTypes: toOptions(operationTypes, ["location_operation_type_id"], ["location_operation_type_name"]),
        contacts: contactOptions,
        countries: toOptions(countries, ["country_id"], ["country_name"]),
        fuelBrands: toOptions(fuelBrands, ["fuel_brand_id"], ["fuel_brand_name"]),
        storeBrands: toOptions(storeBrands, ["store_brand_id"], ["store_brand_name"]),
    };
}

// NOTE: despite the endpoint's "cities" name, this is really country_subdivision
// (State/Province) — see the comment on BE_ENDPOINTS.CITY in config/endpoints.ts.
export async function loadSubdivisionOptions(countryId: string): Promise<DynamicFormOption[]> {
    if (!countryId) return [];
    const rows = await MasterDataApiService.getCitiesByCountry(countryId);
    return toOptions(rows, ["country_subdivision_id"], ["country_subdivision_name", "country_subdivision_code"]);
}
