
namespace eps_fdsudm_api.Features.Forex;

public static class ForexEndpoints
{
    public static void Map(IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("v2/forex");

        MapPostTriggerRateUpdate(group);

    }

    private static void MapPostTriggerRateUpdate(RouteGroupBuilder group)
    {
        group.MapPost("rate/{tenYear}", async (string tenYear, TriggerRateUpdateHandler handler) =>
        {
            var result = await handler.Handle(tenYear);
            return Results.Ok(result);
        })
        .WithName("TriggerRateUpdate")
        .WithTags("TriggerRateUpdate");
    }

}

