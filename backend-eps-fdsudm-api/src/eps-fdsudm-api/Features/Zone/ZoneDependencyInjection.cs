
using eps_fdsudm_api.Shared.Common;


namespace eps_fdsudm_api.Features.Zone;

public class ZoneDependencyInjection : IFeatureDependency
{
    public IServiceCollection Register(IServiceCollection services)
    {
        services.AddScoped<GetZoneByIdHandler>();
        return services;
    }
}