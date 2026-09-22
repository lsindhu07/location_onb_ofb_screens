export const BE_PREFIX = "/api"

export const DATA_PREFIX = "data"
const DATA_API_PREFIX = `${BE_PREFIX}/${DATA_PREFIX}`;

export const BE_ENDPOINTS = {
    DATA: {
        PING: `${DATA_API_PREFIX}/ping`,
    },
    LOCATION: {
        LIST: `/locations`,
        SEARCH: `/locations/search`,
        BY_ID: (locationId: string) => `/locations/${locationId}`,
        SITE: (locationId: string) => `/locations/${locationId}/site`,
    },
    COUNTRY: {
        LIST: `/countries`,
        BY_ZONE: (zoneId: string) => `/countries?enterprise_sub_zone_id=${encodeURIComponent(zoneId)}`,
    },
    // NOTE: despite the "CITY" name, this actually queries dbo.country_subdivision
    // (i.e. State/Province) on the API side — see GetCitiesByCountryIdHandler.
    // Reused as-is for the Location Details tab's State/Province dropdown; worth
    // renaming both sides once there's a real City concept.
    CITY: {
        BY_COUNTRY: (countryId: string) => `/cities?countryId=${encodeURIComponent(countryId)}`,
    },
    SITE: {
        BY_COUNTRY: (countryId: string) => `/sites?countryId=${encodeURIComponent(countryId)}`,
        SEARCH: (query: string) => `/sites/search?q=${encodeURIComponent(query)}`,
    },
    ZONE: {
        LIST: `/zones`,
    },
    OPERATION_STATUS: {
        LIST: `/operation-statuses`,
    },
    BUSINESS_LINE: {
        LIST: `/business-lines`,
    },
    LOCATION_PRIMARY_USE_TYPE: {
        LIST: `/location-primary-use-types`,
    },
    LOCATION_OPERATION_TYPE: {
        LIST: `/location-operation-types`,
    },
    CONTACT: {
        LIST: `/contacts`,
    },
    FUEL_BRAND: {
        LIST: `/fuel-brands`,
    },
    STORE_BRAND: {
        LIST: `/store-brands`,
    },
}