export type LocationRecord = {
    location_id: string;
    location_name: string;
    location_street_address_1: string;
    location_city: string;
    business_line_id: string;
    location_desc: string;
    /** Not a real eps-fdsudm-api field yet — kept so location-list.tsx keeps compiling. Use operation_status_id below for the real status. */
    status: "Active" | "Inactive";

    // --- Everything below matches the real eps-fdsudm-api `Location` entity 1:1
    // (Config/Entities/location.cs). Added for the Location Details + Site tabs;
    // all optional so existing callers of LocationRecord are unaffected. ---
    location_street_address_2?: string | null;
    location_secondary_address?: string | null;
    location_postal_code?: string | null;
    location_lat?: number | null;
    location_long?: number | null;
    site_id?: number | null;
    operation_status_id?: number;
    country_subdivision_id?: number | null;
    location_operation_type_id?: number;
    ownership_percentage?: number;
    cost_center?: string | null;
    ref_sap_location_code?: string;
    sap_affiliate_code?: string | null;
    cpm_id?: number | null;
    location_primary_use_type_id?: number;
    fuel_brand_id?: number | null;
    store_brand_id?: number | null;
    security_level_id?: number;
    managed_space_flag?: boolean;
    is_real_flag?: boolean;
};

// Body for PUT /locations/{id} — mirrors UpdateLocationRequestDto on the API.
// site_id is deliberately excluded: it's owned by the Site tab's link/unlink
// calls (LocationApiService.linkSite/unlinkSite), not the Location Details save.
// location_secondary_address and sap_affiliate_code are also excluded — they're
// real Location fields but aren't on this tab, so the API leaves them untouched.
export type UpdateLocationRequest = {
    location_name: string;
    location_desc?: string | null;
    location_street_address_1?: string | null;
    location_street_address_2?: string | null;
    location_city?: string | null;
    location_postal_code?: string | null;
    location_lat?: number | null;
    location_long?: number | null;
    operation_status_id: number;
    country_subdivision_id?: number | null;
    location_operation_type_id: number;
    ownership_percentage: number;
    cost_center?: string | null;
    ref_sap_location_code: string;
    cpm_id?: number | null;
    location_primary_use_type_id: number;
    fuel_brand_id?: number | null;
    store_brand_id?: number | null;
    business_line_id?: number | null;
    security_level_id: number;
    managed_space_flag: boolean;
    is_real_flag: boolean;
};

// Minimal Site projection returned by GET/PUT /locations/{id}/site — mirrors
// SiteSummaryDto on the API. A Location has at most one Site today (site_id is
// a plain nullable FK column on Location, not a junction table).
export type SiteSummary = {
    site_id: number;
    site_code: string;
    site_name: string;
    country_id: number | null;
};
