using System.Data;
using eps_fdsudm_api.Config;
using Microsoft.EntityFrameworkCore;

namespace eps_fdsudm_api.Features.Zone;

public class GetZoneByIdHandler
{
    private readonly AppDbContext _db;

    public GetZoneByIdHandler(AppDbContext db)
    {
        _db = db;
    }

    public async Task<List<Dictionary<string, object?>>> Handle()
    {
        var connection = _db.Database.GetDbConnection();
        var closeConnection = connection.State != ConnectionState.Open;

        if (closeConnection)
        {
            await connection.OpenAsync();
        }

        try
        {
            await using var command = connection.CreateCommand();
            command.CommandText = "SELECT * FROM dbo.enterprise_sub_zone";

            await using var reader = await command.ExecuteReaderAsync();
            var zones = new List<Dictionary<string, object?>>();

            while (await reader.ReadAsync())
            {
                var row = new Dictionary<string, object?>();

                for (var columnIndex = 0; columnIndex < reader.FieldCount; columnIndex++)
                {
                    row[reader.GetName(columnIndex)] = await reader.IsDBNullAsync(columnIndex)
                        ? null
                        : reader.GetValue(columnIndex);
                }

                zones.Add(row);
            }

            return zones;
        }
        finally
        {
            if (closeConnection)
            {
                await connection.CloseAsync();
            }
        }
    }

    public async Task<Dictionary<string, object?>?> Handle(int id)
    {
        var connection = _db.Database.GetDbConnection();
        var closeConnection = connection.State != ConnectionState.Open;

        if (closeConnection)
        {
            await connection.OpenAsync();
        }

        try
        {
            await using var command = connection.CreateCommand();
            command.CommandText = "SELECT * FROM dbo.enterprise_sub_zone WHERE zone_id = @id";
            var parameter = command.CreateParameter();
            parameter.ParameterName = "@id";
            parameter.Value = id;
            command.Parameters.Add(parameter);

            await using var reader = await command.ExecuteReaderAsync();
            if (!await reader.ReadAsync())
            {
                return null;
            }

            var row = new Dictionary<string, object?>();
            for (var columnIndex = 0; columnIndex < reader.FieldCount; columnIndex++)
            {
                row[reader.GetName(columnIndex)] = await reader.IsDBNullAsync(columnIndex)
                    ? null
                    : reader.GetValue(columnIndex);
            }

            return row;
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

