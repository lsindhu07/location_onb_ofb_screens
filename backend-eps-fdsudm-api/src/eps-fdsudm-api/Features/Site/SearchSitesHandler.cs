using eps_fdsudm_api.Config;
using eps_fdsudm_api.Shared.Models.Dtos;
using Microsoft.EntityFrameworkCore;

namespace eps_fdsudm_api.Features.Site;

public class SearchSitesHandler
{
    private readonly AppDbContext _db;
    public SearchSitesHandler(AppDbContext db) => _db = db;

    // Typeahead search backing the "Add an Existing Site" combo box on the Location
    // record's Site tab. Matches on site name or code; capped at 20 so the combo
    // list stays fast without a bespoke pagination contract for a search-as-you-type box.
    public async Task<List<SiteSummaryDto>> Handle(string query)
    {
        if (string.IsNullOrWhiteSpace(query)) return new List<SiteSummaryDto>();

        var trimmed = query.Trim();

        return await _db.Sites
            .Where(s => EF.Functions.Like(s.site_name, $"%{trimmed}%")
                     || EF.Functions.Like(s.site_code, $"%{trimmed}%"))
            .OrderBy(s => s.site_name)
            .Take(20)
            .Select(s => new SiteSummaryDto(s.site_id, s.site_code, s.site_name, s.country_id))
            .ToListAsync();
    }
}
