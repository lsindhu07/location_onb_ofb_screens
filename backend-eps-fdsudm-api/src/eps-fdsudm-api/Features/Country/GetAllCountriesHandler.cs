using eps_fdsudm_api.Config;
using eps_fdsudm_api.Shared.Common;
using Microsoft.EntityFrameworkCore;

namespace eps_fdsudm_api.Features.Country;

public class GetAllCountriesHandler
{
    private readonly AppDbContext _db;

    public GetAllCountriesHandler(AppDbContext db)
    {
        _db = db;
    }

    public async Task<List<Dictionary<string, object?>>> Handle(int? enterpriseSubZoneId = null)
    {
        var connection = _db.Database.GetDbConnection();
        var closeConnection = connection.State != System.Data.ConnectionState.Open;

        if (closeConnection)
        {
            await connection.OpenAsync();
        }

        try
        {
            await using var command = connection.CreateCommand();

            if (enterpriseSubZoneId.HasValue)
            {
                command.CommandText = "SELECT * FROM dbo.country WHERE enterprise_sub_zone_id = @enterpriseSubZoneId";

                var zoneParam = command.CreateParameter();
                zoneParam.ParameterName = "@enterpriseSubZoneId";
                zoneParam.Value = enterpriseSubZoneId.Value;
                command.Parameters.Add(zoneParam);
            }
            else
            {
                command.CommandText = "SELECT * FROM dbo.country";
            }

            await using var reader = await command.ExecuteReaderAsync();
            var countries = new List<Dictionary<string, object?>>();

            while (await reader.ReadAsync())
            {
                var country = new Dictionary<string, object?>();

                for (var columnIndex = 0; columnIndex < reader.FieldCount; columnIndex++)
                {
                    country[reader.GetName(columnIndex)] = await reader.IsDBNullAsync(columnIndex)
                        ? null
                        : reader.GetValue(columnIndex);
                }

                countries.Add(country);
            }

            return countries;
        }
        finally
        {
            if (closeConnection)
            {
                await connection.CloseAsync();
            }
        }
    }
}

public class CountryDependencyInjection : IFeatureDependency
{
    public IServiceCollection Register(IServiceCollection services)
    {
        services.AddScoped<GetAllCountriesHandler>();
        return services;
    }
}