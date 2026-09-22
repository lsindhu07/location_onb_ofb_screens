using System;
using System.Collections.Generic;

namespace eps_fdsudm_api.Config.Entities;

public partial class Location
{
    public int location_id { get; set; }

    public string location_name { get; set; } = null!;

    public string? location_desc { get; set; }

    public string? location_street_address_1 { get; set; }

    public string? location_street_address_2 { get; set; }

    public string? location_secondary_address { get; set; }

    public string? location_city { get; set; }

    public string? location_postal_code { get; set; }

    public decimal? location_lat { get; set; }

    public decimal? location_long { get; set; }

    public int? site_id { get; set; }

    public int operation_status_id { get; set; }

    public int? country_subdivision_id { get; set; }

    public int location_operation_type_id { get; set; }

    public decimal ownership_percentage { get; set; }

    public string? cost_center { get; set; }

    public string ref_sap_location_code { get; set; } = null!;

    public string? sap_affiliate_code { get; set; }

    public int? cpm_id { get; set; }

    public int location_primary_use_type_id { get; set; }

    public int? fuel_brand_id { get; set; }

    public int? store_brand_id { get; set; }

    public int? business_line_id { get; set; }

    public int security_level_id { get; set; }

    public bool managed_space_flag { get; set; }

    public bool is_real_flag { get; set; }
}