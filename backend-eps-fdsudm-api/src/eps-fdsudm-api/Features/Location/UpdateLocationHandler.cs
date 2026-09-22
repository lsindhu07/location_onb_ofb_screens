using eps_fdsudm_api.Config;
using eps_fdsudm_api.Shared.Models.Dtos;
using Microsoft.EntityFrameworkCore;
using LocationEntity = eps_fdsudm_api.Config.Entities.Location;

namespace eps_fdsudm_api.Features.Location;

public class UpdateLocationHandler
{
    private readonly AppDbContext _db;

    public UpdateLocationHandler(AppDbContext db)
    {
        _db = db;
    }

    // Updates the Location Details tab fields. Does not touch site_id — that is
    // owned by the Site tab's link/unlink endpoints (see LinkLocationSiteHandler /
    // UnlinkLocationSiteHandler) so the two tabs can save independently.
    public async Task<LocationEntity?> Handle(int id, UpdateLocationRequestDto body)
    {
        var location = await _db.Locations.FirstOrDefaultAsync(l => l.location_id == id);
        if (location is null) return null;

        location.location_name = body.location_name;
        location.location_desc = body.location_desc;
        location.location_street_address_1 = body.location_street_address_1;
        location.location_street_address_2 = body.location_street_address_2;
        // location_secondary_address is intentionally left alone — not on the
        // Location Details tab, see UpdateLocationRequestDto.
        location.location_city = body.location_city;
        location.location_postal_code = body.location_postal_code;
        location.location_lat = body.location_lat;
        location.location_long = body.location_long;
        location.operation_status_id = body.operation_status_id;
        location.country_subdivision_id = body.country_subdivision_id;
        location.location_operation_type_id = body.location_operation_type_id;
        location.ownership_percentage = body.ownership_percentage;
        location.cost_center = body.cost_center;
        location.ref_sap_location_code = body.ref_sap_location_code;
        // sap_affiliate_code is intentionally left alone — not on the Location
        // Details tab, see UpdateLocationRequestDto.
        location.cpm_id = body.cpm_id;
        location.location_primary_use_type_id = body.location_primary_use_type_id;
        location.fuel_brand_id = body.fuel_brand_id;
        location.store_brand_id = body.store_brand_id;
        location.business_line_id = body.business_line_id;
        location.security_level_id = body.security_level_id;
        location.managed_space_flag = body.managed_space_flag;
        location.is_real_flag = body.is_real_flag;

        await _db.SaveChangesAsync();
        return location;
    }
}
