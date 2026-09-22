using System;
using System.Collections.Generic;

namespace eps_fdsudm_api.Config.Entities;

public partial class Site
{
    public int site_id { get; set; }

    public string site_code { get; set; } = null!;

    public string site_name { get; set; } = null!;

    public int operation_status_id { get; set; }

    public int? country_id { get; set; }

    public int site_primary_use_type_id { get; set; }

    public decimal? ref_attendance_factor { get; set; }

    public string? ref_acs_site_code { get; set; }

    public string? ref_u_facilities_manager { get; set; }

    public bool virtual_site_flag { get; set; }

    public bool wi_attendance_flag { get; set; }

    public bool pi_ok_flag { get; set; }
}
