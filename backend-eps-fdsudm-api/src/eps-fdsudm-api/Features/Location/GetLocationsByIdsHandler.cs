using eps_fdsudm_api.Config;
using Microsoft.EntityFrameworkCore;
using LocationEntity = eps_fdsudm_api.Config.Entities.Location;

namespace eps_fdsudm_api.Features.Location;

public class GetLocationsByIdsHandler
{
    private readonly AppDbContext _db;

    public GetLocationsByIdsHandler(AppDbContext db)
    {
        _db = db;
    }

    public async Task<List<LocationEntity>> Handle(List<int> ids)
    {
        return await _db.Locations
            .Where(l => ids.Contains(l.location_id))
            .ToListAsync();
    }
}
