using eps_fdsudm_api.Config;
using eps_fdsudm_api.Shared.Common;

namespace eps_fdsudm_api.Features.Contact;

public class GetAllContactsHandler
{
    private readonly AppDbContext _db;
    public GetAllContactsHandler(AppDbContext db) => _db = db;

    // Backs the "Commercial PM" dropdown on the Location Details tab (cpm_id -> contact.contact_id).
    public Task<List<Dictionary<string, object?>>> Handle() =>
        SqlLookupHelper.SelectAllAsync(_db.Database, "SELECT * FROM dbo.contact");
}

public class ContactDependencyInjection : IFeatureDependency
{
    public IServiceCollection Register(IServiceCollection services)
    {
        services.AddScoped<GetAllContactsHandler>();
        return services;
    }
}

public static class ContactEndpoints
{
    public static void Map(IEndpointRouteBuilder app)
    {
        app.MapGet("/contacts", async (GetAllContactsHandler handler) =>
        {
            var result = await handler.Handle();
            return Results.Ok(result);
        })
        .WithName("GetAllContacts")
        .WithTags("Contacts");
    }
}
