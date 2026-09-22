using eps_fdsudm_api.Config;
using eps_fdsudm_api.Shared.Models.Dtos;
using Microsoft.EntityFrameworkCore;

namespace eps_fdsudm_api.Features.HealthCheck.Ping;


public class DbPullHandler
{
    private readonly AppDbContext _db;

    public DbPullHandler(AppDbContext db
        )
    {
        _db = db;
    }

    public async Task<List<SiteMinimalDto>> Handle()
    {
        return await _db.Sites
            .Select(p => new SiteMinimalDto(p.site_id, p.site_code))
            .ToListAsync();
    }
}

