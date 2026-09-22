namespace eps_fdsudm_api.Features.HealthCheck.Ping;

public static class PingEndpoint
{
    public static void Map(IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/ping");

        MapPing(group);
        MapDbPull(group);
    }

    private static void MapPing(RouteGroupBuilder group)
    {
        group.MapGet("", async (PingHandler handler) =>
        {
            var result = await handler.Handle();

            if (result != null)
            {
                return Results.Ok(result);
            }

            return Results.BadRequest();
        })
        .WithName("Ping")
        .WithTags("Ping");
    }


    private static void MapDbPull(RouteGroupBuilder group)
    {
        group.MapGet("/db", async (DbPullHandler handler) =>
        {
            var result = await handler.Handle();

            if (result != null)
            {
                return Results.Ok(result);
            }

            return Results.BadRequest();
        })
            .WithName("Ping_DbPull")
            .WithTags("Ping_DbPull");
    }

}