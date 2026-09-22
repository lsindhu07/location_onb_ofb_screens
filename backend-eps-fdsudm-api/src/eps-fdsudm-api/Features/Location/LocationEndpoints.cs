using eps_fdsudm_api.Shared.Models.Dtos;

namespace eps_fdsudm_api.Features.Location;

public static class LocationEndpoints
{
    public static void Map(IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/locations");

        MapGetAll(group);
        MapGetById(group);
        MapGetByIds(group);
        MapSearch(group);
        MapUpdate(group);
        MapSite(group);
    }

    // GET /locations  -> select * from location
    private static void MapGetAll(RouteGroupBuilder group)
    {
        group.MapGet("", async (GetAllLocationsHandler handler) =>
        {
            var result = await handler.Handle();
            return Results.Ok(result);
        })
        .WithName("GetAllLocations")
        .WithTags("Locations");
    }

    // GET /locations/{id}  -> select * from location where location_id = @id
    private static void MapGetById(RouteGroupBuilder group)
    {
        group.MapGet("/{id:int}", async (int id, GetLocationByIdHandler handler) =>
        {
            var result = await handler.Handle(id);
            return result is not null ? Results.Ok(result) : Results.NotFound();
        })
        .WithName("GetLocationById")
        .WithTags("Locations");
    }

    // GET /locations/by-ids?ids=1,2,3  -> select * from location where location_id in (1,2,3)
    private static void MapGetByIds(RouteGroupBuilder group)
    {
        group.MapGet("/by-ids", async (string ids, GetLocationsByIdsHandler handler) =>
        {
            var parsedIds = new List<int>();
            foreach (var part in ids.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries))
            {
                if (!int.TryParse(part, out var parsedId))
                {
                    return Results.BadRequest($"'{part}' is not a valid location id.");
                }
                parsedIds.Add(parsedId);
            }

            var result = await handler.Handle(parsedIds);
            return Results.Ok(result);
        })
        .WithName("GetLocationsByIds")
        .WithTags("Locations");
    }

    // GET /locations/search?name=...&city=...  -> filter locations by individual fields
    private static void MapSearch(RouteGroupBuilder group)
    {
        group.MapGet("/search", async ([AsParameters] SearchLocationFilters filters, SearchLocationsHandler handler) =>
        {
            var result = await handler.Handle(filters);
            return Results.Ok(result);
        })
        .WithName("SearchLocations")
        .WithTags("Locations");
    }

    // PUT /locations/{id}  -> update the Location Details tab fields
    private static void MapUpdate(RouteGroupBuilder group)
    {
        group.MapPut("/{id:int}", async (int id, UpdateLocationRequestDto body, UpdateLocationHandler handler) =>
        {
            var result = await handler.Handle(id, body);
            return result is not null ? Results.Ok(result) : Results.NotFound();
        })
        .WithName("UpdateLocation")
        .WithTags("Locations");
    }

    // GET /locations/{id}/site       -> the one Site linked to this location, if any
    // PUT /locations/{id}/site       -> link an existing site (body: { site_id })
    // DELETE /locations/{id}/site    -> unlink the site
    private static void MapSite(RouteGroupBuilder group)
    {
        group.MapGet("/{id:int}/site", async (int id, GetLocationSiteHandler handler) =>
        {
            var (locationFound, site) = await handler.Handle(id);
            if (!locationFound) return Results.NotFound();
            return site is not null ? Results.Ok(site) : Results.NoContent();
        })
        .WithName("GetLocationSite")
        .WithTags("Locations");

        group.MapPut("/{id:int}/site", async (int id, LinkSiteRequestDto body, LinkLocationSiteHandler handler) =>
        {
            var (outcome, site) = await handler.Handle(id, body.site_id);
            return outcome switch
            {
                LinkLocationSiteHandler.Outcome.Linked => Results.Ok(site),
                LinkLocationSiteHandler.Outcome.LocationNotFound => Results.NotFound($"Location {id} not found."),
                LinkLocationSiteHandler.Outcome.SiteNotFound => Results.NotFound($"Site {body.site_id} not found."),
                _ => Results.Problem()
            };
        })
        .WithName("LinkLocationSite")
        .WithTags("Locations");

        group.MapDelete("/{id:int}/site", async (int id, UnlinkLocationSiteHandler handler) =>
        {
            var found = await handler.Handle(id);
            return found ? Results.NoContent() : Results.NotFound();
        })
        .WithName("UnlinkLocationSite")
        .WithTags("Locations");
    }
}
