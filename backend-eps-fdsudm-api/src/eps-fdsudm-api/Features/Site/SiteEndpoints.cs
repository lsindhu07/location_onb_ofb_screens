namespace eps_fdsudm_api.Features.Site;

public static class SiteEndpoints
{
    public static void Map(IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/sites");

        // GET /sites?countryId=...  -> filter sites by country_id
        group.MapGet("", async (int? countryId, GetAllSitesHandler handler) =>
        {
            var result = await handler.Handle(countryId);
            return Results.Ok(result);
        })
        .WithName("GetAllSites")
        .WithTags("Sites");

        group.MapGet("/{id:int}", async (int id, GetSiteByIdHandler handler) =>
        {
            var result = await handler.Handle(id);
            return result is not null ? Results.Ok(result) : Results.NotFound();
        })
        .WithName("GetSiteById")
        .WithTags("Sites");

        // GET /sites/search?q=...  -> typeahead by site name/code, for the
        // "Add an Existing Site" combo on the Location record's Site tab
        group.MapGet("/search", async (string q, SearchSitesHandler handler) =>
        {
            var result = await handler.Handle(q);
            return Results.Ok(result);
        })
        .WithName("SearchSites")
        .WithTags("Sites");
    }
}