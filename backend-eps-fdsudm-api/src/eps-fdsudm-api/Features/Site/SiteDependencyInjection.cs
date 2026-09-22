using eps_fdsudm_api.Shared.Common;

namespace eps_fdsudm_api.Features.Site;

public class SiteDependencyInjection : IFeatureDependency
{
    public IServiceCollection Register(IServiceCollection services)
    {
        services.AddScoped<GetAllSitesHandler>();
        services.AddScoped<GetSiteByIdHandler>();
        services.AddScoped<SearchSitesHandler>();
        return services;
    }
}