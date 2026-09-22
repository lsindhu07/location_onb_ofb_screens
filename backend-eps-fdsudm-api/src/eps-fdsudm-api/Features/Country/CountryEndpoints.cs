namespace eps_fdsudm_api.Features.Country;

public static class CountryEndpoints
{
    public static void Map(IEndpointRouteBuilder app)
    {
        app.MapGet("/countries", async (HttpRequest request, GetAllCountriesHandler handler) =>
        {
            var enterpriseSubZoneId = GetOptionalIntQueryValue(request, "enterprise_sub_zone_id")
                ?? GetOptionalIntQueryValue(request, "enterpriseSubZoneId");

            var result = await handler.Handle(enterpriseSubZoneId);
            return Results.Ok(result);
        })
        .WithName("GetAllCountries")
        .WithTags("Countries");

        app.MapGet("/countries/count", async (HttpRequest request, GetAllCountriesHandler handler) =>
        {
            var enterpriseSubZoneId = GetOptionalIntQueryValue(request, "enterprise_sub_zone_id")
                ?? GetOptionalIntQueryValue(request, "enterpriseSubZoneId");

            var result = await handler.Handle(enterpriseSubZoneId);
            return Results.Ok(new { count = result.Count });
        })
        .WithName("CountCountriesBySubZone")
        .WithTags("Countries");
    }

    private static int? GetOptionalIntQueryValue(HttpRequest request, string key)
    {
        var value = request.Query[key].FirstOrDefault();
        if (string.IsNullOrWhiteSpace(value))
        {
            return null;
        }

        return int.TryParse(value, out var parsed) ? parsed : null;
    }
}