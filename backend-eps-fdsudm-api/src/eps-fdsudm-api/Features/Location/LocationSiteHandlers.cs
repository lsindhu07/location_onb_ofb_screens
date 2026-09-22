using eps_fdsudm_api.Config;
using eps_fdsudm_api.Shared.Models.Dtos;
using Microsoft.EntityFrameworkCore;

namespace eps_fdsudm_api.Features.Location;

// A Location has at most one Site today (location.site_id is a plain nullable FK
// column, not a junction table — see UDM 2.0 master sheet). These three handlers
// back the Location record's Site tab: read the linked site, link an existing one,
// or unlink it. If the business ever needs multiple sites per location, this is the
// seam to swap for a real Location<->Site relate table.

public class GetLocationSiteHandler
{
    private readonly AppDbContext _db;
    public GetLocationSiteHandler(AppDbContext db) => _db = db;

    // Returns null if the location doesn't exist OR if it has no site linked —
    // the endpoint maps both to 404/204 respectively, see LocationEndpoints.
    public async Task<(bool locationFound, SiteSummaryDto? site)> Handle(int locationId)
    {
        var location = await _db.Locations
            .Where(l => l.location_id == locationId)
            .Select(l => new { l.site_id })
            .FirstOrDefaultAsync();

        if (location is null) return (false, null);
        if (location.site_id is null) return (true, null);

        var site = await _db.Sites
            .Where(s => s.site_id == location.site_id)
            .Select(s => new SiteSummaryDto(s.site_id, s.site_code, s.site_name, s.country_id))
            .FirstOrDefaultAsync();

        return (true, site);
    }
}

public class LinkLocationSiteHandler
{
    private readonly AppDbContext _db;
    public LinkLocationSiteHandler(AppDbContext db) => _db = db;

    public enum Outcome { Linked, LocationNotFound, SiteNotFound }

    public async Task<(Outcome outcome, SiteSummaryDto? site)> Handle(int locationId, int siteId)
    {
        var location = await _db.Locations.FirstOrDefaultAsync(l => l.location_id == locationId);
        if (location is null) return (Outcome.LocationNotFound, null);

        var site = await _db.Sites.FirstOrDefaultAsync(s => s.site_id == siteId);
        if (site is null) return (Outcome.SiteNotFound, null);

        location.site_id = site.site_id;
        await _db.SaveChangesAsync();

        return (Outcome.Linked, new SiteSummaryDto(site.site_id, site.site_code, site.site_name, site.country_id));
    }
}

public class UnlinkLocationSiteHandler
{
    private readonly AppDbContext _db;
    public UnlinkLocationSiteHandler(AppDbContext db) => _db = db;

    public async Task<bool> Handle(int locationId)
    {
        var location = await _db.Locations.FirstOrDefaultAsync(l => l.location_id == locationId);
        if (location is null) return false;

        location.site_id = null;
        await _db.SaveChangesAsync();
        return true;
    }
}
