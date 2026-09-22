using eps_fdsudm_api.Config;
using eps_fdsudm_api.Shared.Models.Dtos;
using eps_fdsudm_api.Shared.Models.Dtos;
using Microsoft.EntityFrameworkCore;

namespace eps_fdsudm_api.Features.Forex;

public class TriggerRateUpdateHandler
{
    private readonly AppDbContext _db;

    public TriggerRateUpdateHandler(AppDbContext db)
    {
        _db = db;
    }

    public async Task<int> Handle(string tenYear)
    {
        return await _db.Database.ExecuteSqlInterpolatedAsync(
            $"EXEC dbo.sp_forex_rates_update @ten_yr={tenYear}");
    }
}

