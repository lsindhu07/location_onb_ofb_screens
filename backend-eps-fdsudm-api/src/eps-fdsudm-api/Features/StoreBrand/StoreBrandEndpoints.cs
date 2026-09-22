using eps_fdsudm_api.Config;
using eps_fdsudm_api.Shared.Common;

namespace eps_fdsudm_api.Features.StoreBrand;

public class GetAllStoreBrandsHandler
{
    private readonly AppDbContext _db;
    public GetAllStoreBrandsHandler(AppDbContext db) => _db = db;

    // Backs the "Store Brand" dropdown, shown on the Location Details tab only
    // when Primary Use Type is a retail station.
    public Task<List<Dictionary<string, object?>>> Handle() =>
        SqlLookupHelper.SelectAllAsync(_db.Database, "SELECT * FROM dbo.store_brand");
}

public class StoreBrandDependencyInjection : IFeatureDependency
{
    public IServiceCollection Register(IServiceCollection services)
    {
        services.AddScoped<GetAllStoreBrandsHandler>();
        return services;
    }
}

public static class StoreBrandEndpoints
{
    public static void Map(IEndpointRouteBuilder app)
    {
        app.MapGet("/store-brands", async (GetAllStoreBrandsHandler handler) =>
        {
            var result = await handler.Handle();
            return Results.Ok(result);
        })
        .WithName("GetAllStoreBrands")
        .WithTags("StoreBrands");
    }
}
