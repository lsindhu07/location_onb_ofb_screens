using System.Data;
using Microsoft.EntityFrameworkCore;

namespace eps_fdsudm_api.Shared.Common;

// The Country/City/Zone features each hand-roll the same raw-ADO.NET
// "SELECT * FROM dbo.<table> -> List<Dictionary<string,object?>>" block. New
// simple reference/lookup tables (operation_status, business_line, etc.) need
// the exact same thing, so this factors that block out to one place instead
// of a sixth copy-paste. Existing Country/City/Zone handlers are left as-is.
public static class SqlLookupHelper
{
    public static async Task<List<Dictionary<string, object?>>> SelectAllAsync(
        DatabaseFacade database,
        string sql,
        (string name, object value)? parameter = null)
    {
        var connection = database.GetDbConnection();
        var closeConnection = connection.State != ConnectionState.Open;

        if (closeConnection)
        {
            await connection.OpenAsync();
        }

        try
        {
            await using var command = connection.CreateCommand();
            command.CommandText = sql;

            if (parameter is not null)
            {
                var dbParameter = command.CreateParameter();
                dbParameter.ParameterName = parameter.Value.name;
                dbParameter.Value = parameter.Value.value;
                command.Parameters.Add(dbParameter);
            }

            await using var reader = await command.ExecuteReaderAsync();
            var rows = new List<Dictionary<string, object?>>();

            while (await reader.ReadAsync())
            {
                var row = new Dictionary<string, object?>();
                for (var columnIndex = 0; columnIndex < reader.FieldCount; columnIndex++)
                {
                    row[reader.GetName(columnIndex)] = await reader.IsDBNullAsync(columnIndex)
                        ? null
                        : reader.GetValue(columnIndex);
                }
                rows.Add(row);
            }

            return rows;
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
