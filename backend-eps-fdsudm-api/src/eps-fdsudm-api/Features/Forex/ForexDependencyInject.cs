using eps_fdsudm_api.Features.Zone;
using eps_fdsudm_api.Shared.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace eps_fdsudm_api.Features.Forex;

public class ForexDependencyInject : IFeatureDependency
{
    public IServiceCollection Register(IServiceCollection services)
    {
        services.AddScoped<TriggerRateUpdateHandler>();
        services.AddScoped<CreateForexRateHandler>();
        services.AddScoped<UpdateForexRatesHandler>();
        
        return services;
    }
}