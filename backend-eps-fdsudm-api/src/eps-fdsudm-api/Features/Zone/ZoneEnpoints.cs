namespace eps_fdsudm_api.Features.Zone;

public static class ZoneEndpoints
{
    public static void Map(IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/zones");

        MapGetAll(group);
        MapGetById(group);
    }

    private static void MapGetAll(RouteGroupBuilder group)
    {
        group.MapGet("", async (GetZoneByIdHandler handler) =>
        {
            var result = await handler.Handle();
            return Results.Ok(result);
        })
        .WithName("GetAllZones")
        .WithTags("Zones");
    }

    private static void MapGetById(RouteGroupBuilder group)
    {
        group.MapGet("/{id:int}", async (int id, GetZoneByIdHandler handler) =>
        {
            var result = await handler.Handle(id);
            return result is not null ? Results.Ok(result) : Results.NotFound();
        })
        .WithName("GetZoneById")
        .WithTags("Zones");
    }
}

