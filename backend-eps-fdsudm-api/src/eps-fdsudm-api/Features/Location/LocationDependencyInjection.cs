using eps_fdsudm_api.Shared.Common;

namespace eps_fdsudm_api.Features.Location;

public class LocationDependencyInjection : IFeatureDependency
{
    public IServiceCollection Register(IServiceCollection services)
    {
        services.AddScoped<GetAllLocationsHandler>();
        services.AddScoped<GetLocationByIdHandler>();
        services.AddScoped<GetLocationsByIdsHandler>();
        services.AddScoped<SearchLocationsHandler>();
        services.AddScoped<UpdateLocationHandler>();
        services.AddScoped<GetLocationSiteHandler>();
        services.AddScoped<LinkLocationSiteHandler>();
        services.AddScoped<UnlinkLocationSiteHandler>();
        return services;
    }
}
