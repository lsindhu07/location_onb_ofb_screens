using eps_fdsudm_api.Config;
using eps_fdsudm_api.Shared.Common;

namespace eps_fdsudm_api.Features.BusinessLine;

public class GetAllBusinessLinesHandler
{
    private readonly AppDbContext _db;
    public GetAllBusinessLinesHandler(AppDbContext db) => _db = db;

    // Backs the "Business Line" dropdown on the Location Details tab.
    public Task<List<Dictionary<string, object?>>> Handle() =>
        SqlLookupHelper.SelectAllAsync(_db.Database, "SELECT * FROM dbo.business_line");
}

public class BusinessLineDependencyInjection : IFeatureDependency
{
    public IServiceCollection Register(IServiceCollection services)
    {
        services.AddScoped<GetAllBusinessLinesHandler>();
        return services;
    }
}

public static class BusinessLineEndpoints
{
    public static void Map(IEndpointRouteBuilder app)
    {
        app.MapGet("/business-lines", async (GetAllBusinessLinesHandler handler) =>
        {
            var result = await handler.Handle();
            return Results.Ok(result);
        })
        .WithName("GetAllBusinessLines")
        .WithTags("BusinessLines");
    }
}
