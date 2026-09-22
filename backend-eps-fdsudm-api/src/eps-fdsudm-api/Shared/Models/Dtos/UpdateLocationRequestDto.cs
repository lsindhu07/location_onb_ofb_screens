using System;
using System.Collections.Generic;
using System.Text;

namespace eps_fdsudm_api.Shared.Models.Dtos
{
    // Body for PUT /locations/{id} — only the fields the Location Details tab
    // actually edits. Deliberately excludes location_secondary_address and
    // sap_affiliate_code: they exist on the Location entity but aren't on this
    // tab, and UpdateLocationHandler leaves them untouched so a Location
    // Details save can't silently null them out.
    public record UpdateLocationRequestDto
    {
        public string location_name { get; init; } = null!;
        public string? location_desc { get; init; }
        public string? location_street_address_1 { get; init; }
        public string? location_street_address_2 { get; init; }
        public string? location_city { get; init; }
        public string? location_postal_code { get; init; }
        public decimal? location_lat { get; init; }
        public decimal? location_long { get; init; }
        public int operation_status_id { get; init; }
        public int? country_subdivision_id { get; init; }
        public int location_operation_type_id { get; init; }
        public decimal ownership_percentage { get; init; }
        public string? cost_center { get; init; }
        public string ref_sap_location_code { get; init; } = null!;
        public int? cpm_id { get; init; }
        public int location_primary_use_type_id { get; init; }
        public int? fuel_brand_id { get; init; }
        public int? store_brand_id { get; init; }
        public int? business_line_id { get; init; }
        public int security_level_id { get; init; }
        public bool managed_space_flag { get; init; }
        public bool is_real_flag { get; init; }
    }
}
