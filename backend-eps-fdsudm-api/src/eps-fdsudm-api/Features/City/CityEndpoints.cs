namespace eps_fdsudm_api.Features.City;

public static class CityEndpoints
{
    public static void Map(IEndpointRouteBuilder app)
    {
        app.MapGet("/cities", async (int countryId, GetCitiesByCountryIdHandler handler) =>
        {
            var result = await handler.Handle(countryId);
            return Results.Ok(result);
        })
        .WithName("GetCitiesByCountryId")
        .WithTags("Cities");
    }
}