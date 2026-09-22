using System;
using System.Collections.Generic;
using System.Text;

namespace eps_fdsudm_api.Shared.Models.Dtos
{
    // Minimal Site projection used on the Location record's Site tab.
    public record SiteSummaryDto(int site_id, string site_code, string site_name, int? country_id)
    {
    }
}
