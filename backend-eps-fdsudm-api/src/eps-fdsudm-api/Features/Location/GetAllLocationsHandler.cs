using eps_fdsudm_api.Config;
using Microsoft.EntityFrameworkCore;
using LocationEntity = eps_fdsudm_api.Config.Entities.Location;

namespace eps_fdsudm_api.Features.Location;

public class GetAllLocationsHandler
{
    private readonly AppDbContext _db;

    public GetAllLocationsHandler(AppDbContext db)
    {
        _db = db;
    }

    public async Task<List<LocationEntity>> Handle()
    {
        return await _db.Locations.ToListAsync();
    }
}

public class SearchLocationsHandler
{
    private readonly AppDbContext _db;

    public SearchLocationsHandler(AppDbContext db)
    {
        _db = db;
    }

    public async Task<List<LocationEntity>> Handle(SearchLocationFilters filters)
    {
        IQueryable<LocationEntity> locations = _db.Locations;

        if (filters.LocationId.HasValue) locations = locations.Where(location => location.location_id == filters.LocationId);
        if (!string.IsNullOrWhiteSpace(filters.Name)) locations = locations.Where(location => EF.Functions.Like(location.location_name, $"%{filters.Name.Trim()}%"));
        if (!string.IsNullOrWhiteSpace(filters.Description)) locations = locations.Where(location => location.location_desc != null && EF.Functions.Like(location.location_desc, $"%{filters.Description.Trim()}%"));
        if (!string.IsNullOrWhiteSpace(filters.StreetAddress1)) locations = locations.Where(location => location.location_street_address_1 != null && EF.Functions.Like(location.location_street_address_1, $"%{filters.StreetAddress1.Trim()}%"));
        if (!string.IsNullOrWhiteSpace(filters.StreetAddress2)) locations = locations.Where(location => location.location_street_address_2 != null && EF.Functions.Like(location.location_street_address_2, $"%{filters.StreetAddress2.Trim()}%"));
        if (!string.IsNullOrWhiteSpace(filters.SecondaryAddress)) locations = locations.Where(location => location.location_secondary_address != null && EF.Functions.Like(location.location_secondary_address, $"%{filters.SecondaryAddress.Trim()}%"));
        if (!string.IsNullOrWhiteSpace(filters.City)) locations = locations.Where(location => location.location_city != null && EF.Functions.Like(location.location_city, $"%{filters.City.Trim()}%"));
        if (!string.IsNullOrWhiteSpace(filters.PostalCode)) locations = locations.Where(location => location.location_postal_code != null && EF.Functions.Like(location.location_postal_code, $"%{filters.PostalCode.Trim()}%"));
        if (filters.Latitude.HasValue) locations = locations.Where(location => location.location_lat == filters.Latitude);
        if (filters.Longitude.HasValue) locations = locations.Where(location => location.location_long == filters.Longitude);
        if (filters.SiteId.HasValue) locations = locations.Where(location => location.site_id == filters.SiteId);
        if (filters.OperationStatusId.HasValue) locations = locations.Where(location => location.operation_status_id == filters.OperationStatusId);
        if (filters.CountrySubdivisionId.HasValue) locations = locations.Where(location => location.country_subdivision_id == filters.CountrySubdivisionId);
        if (filters.OperationTypeId.HasValue) locations = locations.Where(location => location.location_operation_type_id == filters.OperationTypeId);
        if (filters.OwnershipPercentage.HasValue) locations = locations.Where(location => location.ownership_percentage == filters.OwnershipPercentage);
        if (!string.IsNullOrWhiteSpace(filters.CostCenter)) locations = locations.Where(location => location.cost_center != null && EF.Functions.Like(location.cost_center, $"%{filters.CostCenter.Trim()}%"));
        if (!string.IsNullOrWhiteSpace(filters.SapLocationCode)) locations = locations.Where(location => EF.Functions.Like(location.ref_sap_location_code, $"%{filters.SapLocationCode.Trim()}%"));
        if (!string.IsNullOrWhiteSpace(filters.SapAffiliateCode)) locations = locations.Where(location => location.sap_affiliate_code != null && EF.Functions.Like(location.sap_affiliate_code, $"%{filters.SapAffiliateCode.Trim()}%"));
        if (filters.CpmId.HasValue) locations = locations.Where(location => location.cpm_id == filters.CpmId);
        if (filters.PrimaryUseTypeId.HasValue) locations = locations.Where(location => location.location_primary_use_type_id == filters.PrimaryUseTypeId);
        if (filters.FuelBrandId.HasValue) locations = locations.Where(location => location.fuel_brand_id == filters.FuelBrandId);
        if (filters.StoreBrandId.HasValue) locations = locations.Where(location => location.store_brand_id == filters.StoreBrandId);
        if (filters.BusinessLineId.HasValue) locations = locations.Where(location => location.business_line_id == filters.BusinessLineId);
        if (filters.SecurityLevelId.HasValue) locations = locations.Where(location => location.security_level_id == filters.SecurityLevelId);
        if (filters.ManagedSpaceFlag.HasValue) locations = locations.Where(location => location.managed_space_flag == filters.ManagedSpaceFlag);
        if (filters.IsRealFlag.HasValue) locations = locations.Where(location => location.is_real_flag == filters.IsRealFlag);

        return await locations
            .OrderBy(location => location.location_name)
            .ToListAsync();
    }
}

public class SearchLocationFilters
{
    public int? LocationId { get; init; }
    public string? Name { get; init; }
    public string? Description { get; init; }
    public string? StreetAddress1 { get; init; }
    public string? StreetAddress2 { get; init; }
    public string? SecondaryAddress { get; init; }
    public string? City { get; init; }
    public string? PostalCode { get; init; }
    public decimal? Latitude { get; init; }
    public decimal? Longitude { get; init; }
    public int? SiteId { get; init; }
    public int? OperationStatusId { get; init; }
    public int? CountrySubdivisionId { get; init; }
    public int? OperationTypeId { get; init; }
    public decimal? OwnershipPercentage { get; init; }
    public string? CostCenter { get; init; }
    public string? SapLocationCode { get; init; }
    public string? SapAffiliateCode { get; init; }
    public int? CpmId { get; init; }
    public int? PrimaryUseTypeId { get; init; }
    public int? FuelBrandId { get; init; }
    public int? StoreBrandId { get; init; }
    public int? BusinessLineId { get; init; }
    public int? SecurityLevelId { get; init; }
    public bool? ManagedSpaceFlag { get; init; }
    public bool? IsRealFlag { get; init; }
}
