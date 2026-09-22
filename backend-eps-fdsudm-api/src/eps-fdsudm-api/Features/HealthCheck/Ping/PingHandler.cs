using eps_fdsudm_api.Config;
using Microsoft.EntityFrameworkCore;

namespace eps_fdsudm_api.Features.HealthCheck.Ping;

public record PingResponse(string msg)
{
    //public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}

public class PingHandler
{
    //private readonly AppDbContext _db;

    public PingHandler(//AppDbContext db
        )
    {
       // _db = db;
    }

    public async Task<PingResponse> Handle()
    {
        return new PingResponse("OK");
    }
}