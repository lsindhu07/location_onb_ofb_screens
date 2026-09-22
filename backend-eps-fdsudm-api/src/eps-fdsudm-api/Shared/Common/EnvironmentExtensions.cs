using System;
using System.Collections.Generic;
using System.Text;

namespace eps_fdsudm_api.Shared.Common
{

    public static class EnvironmentExtensions
    {

        public static AppEnvironment AsEnum(this IWebHostEnvironment env)
            => Enum.Parse<AppEnvironment>(env.EnvironmentName, true);

        //public static bool IsLocal(this IWebHostEnvironment env)
        //    => env.IsEnvironment(AppEnvironment.Local);

        //public static bool IsQA(this IWebHostEnvironment env)
        //    => env.IsEnvironment(AppEnvironment.QA);
    }

}
