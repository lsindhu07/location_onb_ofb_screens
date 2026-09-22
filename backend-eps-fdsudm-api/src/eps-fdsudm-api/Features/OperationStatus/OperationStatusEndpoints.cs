using eps_fdsudm_api.Config;
using eps_fdsudm_api.Shared.Common;

namespace eps_fdsudm_api.Features.OperationStatus;

public class GetAllOperationStatusesHandler
{
    private readonly AppDbContext _db;
    public GetAllOperationStatusesHandler(AppDbContext db) => _db = db;

    // Backs the "Operational Status" dropdown on the Location Details tab.
    public Task<List<Dictionary<string, object?>>> Handle() =>
        SqlLookupHelper.SelectAllAsync(_db.Database, "SELECT * FROM dbo.operation_status");
}

public class OperationStatusDependencyInjection : IFeatureDependency
{
    public IServiceCollection Register(IServiceCollection services)
    {
        services.AddScoped<GetAllOperationStatusesHandler>();
        return services;
    }
}

public static class OperationStatusEndpoints
{
    public static void Map(IEndpointRouteBuilder app)
    {
        app.MapGet("/operation-statuses", async (GetAllOperationStatusesHandler handler) =>
        {
            var result = await handler.Handle();
            return Results.Ok(result);
        })
        .WithName("GetAllOperationStatuses")
        .WithTags("OperationStatuses");
    }
}
