using eps_fdsudm_api.Config;
using Microsoft.EntityFrameworkCore;
using LocationEntity = eps_fdsudm_api.Config.Entities.Location;

namespace eps_fdsudm_api.Features.Location;

public class GetLocationByIdHandler
{
    private readonly AppDbContext _db;

    public GetLocationByIdHandler(AppDbContext db)
    {
        _db = db;
    }

    public async Task<LocationEntity?> Handle(int id)
    {
        return await _db.Locations
            .FirstOrDefaultAsync(l => l.location_id == id);
    }
}
