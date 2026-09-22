using eps_fdsudm_api.Config;
using eps_fdsudm_api.Shared.Common;

namespace eps_fdsudm_api.Features.FuelBrand;

public class GetAllFuelBrandsHandler
{
    private readonly AppDbContext _db;
    public GetAllFuelBrandsHandler(AppDbContext db) => _db = db;

    // Backs the "Fuel Brand" dropdown, shown on the Location Details tab only
    // when Primary Use Type is a retail station.
    public Task<List<Dictionary<string, object?>>> Handle() =>
        SqlLookupHelper.SelectAllAsync(_db.Database, "SELECT * FROM dbo.fuel_brand");
}

public class FuelBrandDependencyInjection : IFeatureDependency
{
    public IServiceCollection Register(IServiceCollection services)
    {
        services.AddScoped<GetAllFuelBrandsHandler>();
        return services;
    }
}

public static class FuelBrandEndpoints
{
    public static void Map(IEndpointRouteBuilder app)
    {
        app.MapGet("/fuel-brands", async (GetAllFuelBrandsHandler handler) =>
        {
            var result = await handler.Handle();
            return Results.Ok(result);
        })
        .WithName("GetAllFuelBrands")
        .WithTags("FuelBrands");
    }
}
