using eps_fdsudm_api.Config;
using eps_fdsudm_api.Shared.Common;

namespace eps_fdsudm_api.Features.LocationOperationType;

public class GetAllLocationOperationTypesHandler
{
    private readonly AppDbContext _db;
    public GetAllLocationOperationTypesHandler(AppDbContext db) => _db = db;

    // Backs the "Location Operational Type" dropdown (COAG/CODO/CORS/...) on the Location Details tab.
    public Task<List<Dictionary<string, object?>>> Handle() =>
        SqlLookupHelper.SelectAllAsync(_db.Database, "SELECT * FROM dbo.location_operation_type");
}

public class LocationOperationTypeDependencyInjection : IFeatureDependency
{
    public IServiceCollection Register(IServiceCollection services)
    {
        services.AddScoped<GetAllLocationOperationTypesHandler>();
        return services;
    }
}

public static class LocationOperationTypeEndpoints
{
    public static void Map(IEndpointRouteBuilder app)
    {
        app.MapGet("/location-operation-types", async (GetAllLocationOperationTypesHandler handler) =>
        {
            var result = await handler.Handle();
            return Results.Ok(result);
        })
        .WithName("GetAllLocationOperationTypes")
        .WithTags("LocationOperationTypes");
    }
}
