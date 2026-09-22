import { BE_ENDPOINTS } from "@/config/endpoints";
import { getRequest } from "@/services/be-api.service";

export type LookupRecord = Record<string, unknown>;

export const MasterDataApiService = {
    getCountries: async (): Promise<LookupRecord[]> => {
        return getRequest<LookupRecord[]>(BE_ENDPOINTS.COUNTRY.LIST);
    },

    getCountriesByZone: async (zoneId: string): Promise<LookupRecord[]> => {
        return getRequest<LookupRecord[]>(BE_ENDPOINTS.COUNTRY.BY_ZONE(zoneId));
    },

    getZones: async (): Promise<LookupRecord[]> => {
        return getRequest<LookupRecord[]>(BE_ENDPOINTS.ZONE.LIST);
    },

    getCitiesByCountry: async (countryId: string): Promise<LookupRecord[]> => {
        return getRequest<LookupRecord[]>(BE_ENDPOINTS.CITY.BY_COUNTRY(countryId));
    },

    getSitesByCountry: async (countryId: string): Promise<LookupRecord[]> => {
        return getRequest<LookupRecord[]>(BE_ENDPOINTS.SITE.BY_COUNTRY(countryId));
    },

    // Typeahead for the "Add an Existing Site" combo on the Location record's Site tab.
    searchSites: async (query: string): Promise<LookupRecord[]> => {
        if (!query.trim()) return [];
        return getRequest<LookupRecord[]>(BE_ENDPOINTS.SITE.SEARCH(query));
    },

    // --- Location Details tab dropdown sources ---
    getOperationStatuses: async (): Promise<LookupRecord[]> => {
        return getRequest<LookupRecord[]>(BE_ENDPOINTS.OPERATION_STATUS.LIST);
    },

    getBusinessLines: async (): Promise<LookupRecord[]> => {
        return getRequest<LookupRecord[]>(BE_ENDPOINTS.BUSINESS_LINE.LIST);
    },

    getLocationPrimaryUseTypes: async (): Promise<LookupRecord[]> => {
        return getRequest<LookupRecord[]>(BE_ENDPOINTS.LOCATION_PRIMARY_USE_TYPE.LIST);
    },

    getLocationOperationTypes: async (): Promise<LookupRecord[]> => {
        return getRequest<LookupRecord[]>(BE_ENDPOINTS.LOCATION_OPERATION_TYPE.LIST);
    },

    getContacts: async (): Promise<LookupRecord[]> => {
        return getRequest<LookupRecord[]>(BE_ENDPOINTS.CONTACT.LIST);
    },

    getFuelBrands: async (): Promise<LookupRecord[]> => {
        return getRequest<LookupRecord[]>(BE_ENDPOINTS.FUEL_BRAND.LIST);
    },

    getStoreBrands: async (): Promise<LookupRecord[]> => {
        return getRequest<LookupRecord[]>(BE_ENDPOINTS.STORE_BRAND.LIST);
    },
};
