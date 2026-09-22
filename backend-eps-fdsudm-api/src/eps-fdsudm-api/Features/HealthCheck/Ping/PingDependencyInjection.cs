using eps_fdsudm_api.Shared.Common;

namespace eps_fdsudm_api.Features.HealthCheck.Ping;


public class PingDependencyInjection : IFeatureDependency
{
    public IServiceCollection Register(IServiceCollection services)
    {
        services.AddScoped<PingHandler>();
        services.AddScoped<DbPullHandler>();
        return services;
    }
}

