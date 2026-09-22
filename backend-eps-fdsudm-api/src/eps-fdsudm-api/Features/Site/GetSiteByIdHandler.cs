using eps_fdsudm_api.Config;
using Microsoft.EntityFrameworkCore;
using SiteEntity = eps_fdsudm_api.Config.Entities.Site;

namespace eps_fdsudm_api.Features.Site;

public class GetSiteByIdHandler
{
    private readonly AppDbContext _db;

    public GetSiteByIdHandler(AppDbContext db)
    {
        _db = db;
    }

    public async Task<SiteEntity?> Handle(int id)
    {
        return await _db.Sites
            .FirstOrDefaultAsync(site => site.site_id == id);
    }
}