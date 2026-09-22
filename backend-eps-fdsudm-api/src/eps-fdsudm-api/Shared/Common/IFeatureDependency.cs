using System;
using System.Collections.Generic;
using System.Text;

namespace eps_fdsudm_api.Shared.Common
{
    public interface IFeatureDependency
    {
        IServiceCollection Register(IServiceCollection services);
    }

}
