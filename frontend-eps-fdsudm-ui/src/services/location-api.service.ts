import { BE_ENDPOINTS } from "@/config/endpoints";
import { deleteRequest, getRequest, postRequest, putRequest } from "@/services/be-api.service";
import type { LocationRecord, SiteSummary, UpdateLocationRequest } from "@/models/api/location-dto";

export type LocationSearchParams = {
    locationId?: string;
    name?: string;
    description?: string;
    streetAddress1?: string;
    city?: string;
    country?: string;
    postalCode?: string;
    latitude?: string;
    longitude?: string;
    siteId?: string;
    operationStatusId?: string;
    countrySubdivisionId?: string;
    operationTypeId?: string;
    ownershipPercentage?: string;
    costCenter?: string;
    sapLocationCode?: string;
    sapAffiliateCode?: string;
    cpmId?: string;
    primaryUseTypeId?: string;
    fuelBrandId?: string;
    storeBrandId?: string;
    businessLineId?: string;
    securityLevelId?: string;
    managedSpaceFlag?: string;
    isRealFlag?: string;
};

function buildSearchQuery(params: LocationSearchParams) {
    const query = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
            query.set(key, value);
        }
    });

    return query.toString();
}

export const LocationApiService = {
    getLocationList: async (): Promise<LocationRecord[]> => {
        return getRequest<LocationRecord[]>(BE_ENDPOINTS.LOCATION.LIST);
    },

    searchLocations: async (params: LocationSearchParams): Promise<LocationRecord[]> => {
        const query = buildSearchQuery(params);
        return getRequest<LocationRecord[]>(`${BE_ENDPOINTS.LOCATION.SEARCH}?${query}`);
    },

    getLocationById: async (locationId: string): Promise<LocationRecord | undefined> => {
        return getRequest<LocationRecord>(BE_ENDPOINTS.LOCATION.BY_ID(locationId));
    },

    saveLocation: async (location: LocationRecord): Promise<LocationRecord> => {
        return postRequest<LocationRecord>(BE_ENDPOINTS.LOCATION.LIST, location);
    },

    // Location Details tab "Save" — PUT /locations/{id}. Does not touch the
    // linked site; that's the Site tab's own save (see below).
    updateLocation: async (locationId: string, body: UpdateLocationRequest): Promise<LocationRecord> => {
        return putRequest<LocationRecord>(BE_ENDPOINTS.LOCATION.BY_ID(locationId), body);
    },

    // Site tab: the one Site linked to this location, or null if none.
    getLocationSite: async (locationId: string): Promise<SiteSummary | null> => {
        return getRequest<SiteSummary | null>(BE_ENDPOINTS.LOCATION.SITE(locationId));
    },

    // Site tab: link an existing site (from the search combo).
    linkSite: async (locationId: string, siteId: number): Promise<SiteSummary> => {
        return putRequest<SiteSummary>(BE_ENDPOINTS.LOCATION.SITE(locationId), { site_id: siteId });
    },

    // Site tab: unlink the currently-linked site.
    unlinkSite: async (locationId: string): Promise<void> => {
        return deleteRequest<void>(BE_ENDPOINTS.LOCATION.SITE(locationId));
    },
};
