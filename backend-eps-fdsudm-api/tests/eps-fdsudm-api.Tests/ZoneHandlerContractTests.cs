using System.Reflection;
using eps_fdsudm_api.Features.Zone;

namespace eps_fdsudm_api.Tests;

public class ZoneHandlerContractTests
{
    [Fact]
    public void GetZoneByIdHandler_ShouldReturnRawZoneRowDictionary()
    {
        var method = typeof(GetZoneByIdHandler).GetMethod(nameof(GetZoneByIdHandler.Handle), BindingFlags.Instance | BindingFlags.Public);

        Assert.NotNull(method);
        Assert.Equal(typeof(Task<Dictionary<string, object?>?>), method!.ReturnType);
    }
}
