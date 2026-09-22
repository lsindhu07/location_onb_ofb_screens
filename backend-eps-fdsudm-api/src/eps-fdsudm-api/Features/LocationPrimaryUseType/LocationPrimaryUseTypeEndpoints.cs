using eps_fdsudm_api.Config;
using eps_fdsudm_api.Shared.Common;

namespace eps_fdsudm_api.Features.LocationPrimaryUseType;

public class GetAllLocationPrimaryUseTypesHandler
{
    private readonly AppDbContext _db;
    public GetAllLocationPrimaryUseTypesHandler(AppDbContext db) => _db = db;

    // Backs the "Primary Use / Service Type" dropdown on the Location Details tab.
    public Task<List<Dictionary<string, object?>>> Handle() =>
        SqlLookupHelper.SelectAllAsync(_db.Database, "SELECT * FROM dbo.location_primary_use_type");
}

public class LocationPrimaryUseTypeDependencyInjection : IFeatureDependency
{
    public IServiceCollection Register(IServiceCollection services)
    {
        services.AddScoped<GetAllLocationPrimaryUseTypesHandler>();
        return services;
    }
}

public static class LocationPrimaryUseTypeEndpoints
{
    public static void Map(IEndpointRouteBuilder app)
    {
        app.MapGet("/location-primary-use-types", async (GetAllLocationPrimaryUseTypesHandler handler) =>
        {
            var result = await handler.Handle();
            return Results.Ok(result);
        })
        .WithName("GetAllLocationPrimaryUseTypes")
        .WithTags("LocationPrimaryUseTypes");
    }
}
