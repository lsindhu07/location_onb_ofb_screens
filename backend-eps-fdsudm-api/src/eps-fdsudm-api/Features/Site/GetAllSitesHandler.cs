using eps_fdsudm_api.Config;
using Microsoft.EntityFrameworkCore;
using SiteEntity = eps_fdsudm_api.Config.Entities.Site;

namespace eps_fdsudm_api.Features.Site;

public class GetAllSitesHandler
{
    private readonly AppDbContext _db;

    public GetAllSitesHandler(AppDbContext db)
    {
        _db = db;
    }

    public async Task<List<SiteEntity>> Handle(int? countryId)
    {
        var sites = _db.Sites.AsQueryable();

        if (countryId.HasValue)
        {
            sites = sites.Where(site => site.country_id == countryId);
        }

        return await sites
            .OrderBy(site => site.site_name)
            .ToListAsync();
    }
}