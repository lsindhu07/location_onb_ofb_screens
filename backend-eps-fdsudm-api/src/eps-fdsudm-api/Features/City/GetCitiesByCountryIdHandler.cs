using eps_fdsudm_api.Config;
using eps_fdsudm_api.Shared.Common;
using Microsoft.EntityFrameworkCore;

namespace eps_fdsudm_api.Features.City;

public class GetCitiesByCountryIdHandler
{
    private readonly AppDbContext _db;

    public GetCitiesByCountryIdHandler(AppDbContext db)
    {
        _db = db;
    }

    public async Task<List<Dictionary<string, object?>>> Handle(int countryId)
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
            command.CommandText = "SELECT * FROM dbo.country_subdivision WHERE country_id = @countryId";

            var countryIdParameter = command.CreateParameter();
            countryIdParameter.ParameterName = "@countryId";
            countryIdParameter.Value = countryId;
            command.Parameters.Add(countryIdParameter);

            await using var reader = await command.ExecuteReaderAsync();
            var cities = new List<Dictionary<string, object?>>();

            while (await reader.ReadAsync())
            {
                var city = new Dictionary<string, object?>();

                for (var columnIndex = 0; columnIndex < reader.FieldCount; columnIndex++)
                {
                    city[reader.GetName(columnIndex)] = await reader.IsDBNullAsync(columnIndex)
                        ? null
                        : reader.GetValue(columnIndex);
                }

                cities.Add(city);
            }

            return cities;
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

public class CityDependencyInjection : IFeatureDependency
{
    public IServiceCollection Register(IServiceCollection services)
    {
        services.AddScoped<GetCitiesByCountryIdHandler>();
        return services;
    }
}