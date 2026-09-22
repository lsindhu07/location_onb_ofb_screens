using eps_fdsudm_api.Config;
using eps_fdsudm_api.Config.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace eps_fdsudm_api.Features.Forex;

public class UpdateForexRatesHandler
{
    private readonly AppDbContext _db;
    private readonly ILogger<UpdateForexRatesHandler> _logger;

    public UpdateForexRatesHandler(
        AppDbContext db,
        ILogger<UpdateForexRatesHandler> logger)
    {
        _db = db;
        _logger = logger;
    }

    public async Task Handle(string tenYr = "N")
    {
        int currentYear = DateTime.UtcNow.Year;

        var forexRows = await _db.TblForexRates.ToListAsync();

        if (!forexRows.Any())
            throw new InvalidOperationException(
                "Please place forex updates in the load table to proceed.");

        foreach (var row in forexRows)
        {
            if (!row.CurrencyId.HasValue)
                throw new InvalidOperationException("CurrencyId cannot be null.");

            int currencyId = row.CurrencyId.Value;

            _logger.LogInformation(
                "Processing forex updates for CurrencyId {CurrencyId}",
                currencyId);

            #region STEP 1: Prior Year P&B rates (month=14, years 0–4)

            for (int pi = 0; pi <= 4; pi++)
            {
                int year = currentYear + pi;
                string yearStr = year.ToString();

                decimal? priorRate = await _db.CurrencyExchangeRates
                    .Where(x =>
                        x.CurrencyId == currencyId &&
                        x.Month == 0 &&
                        x.Year == yearStr)
                    .Select(x => (decimal?)x.Rate)
                    .FirstOrDefaultAsync();

                if (priorRate.HasValue)
                {
                    UpsertRate(currencyId, year, 14, priorRate.Value, 4);
                }
            }

            #endregion

            #region STEP 2: Current Year Outlook Rate (month=13)

            decimal forex0 = GetRequiredRate(row.Forex0, nameof(row.Forex0), currencyId);

            UpsertRate(currencyId, currentYear, 13, forex0, 3);

            #endregion

            #region STEP 3: Plan + Outlook Rates (Years +1 to +20)

            for (int i = 1; i <= 20; i++)
            {
                int targetYear = currentYear + i;
                decimal rate = GetRate(row, i, tenYr, currencyId);

                // Plan rate
                UpsertRate(currencyId, targetYear, 0, rate, 1);

                // Outlook rate
                UpsertRate(currencyId, targetYear, 13, rate, 3);
            }

            #endregion
        }

        await _db.SaveChangesAsync();

        _logger.LogInformation("Forex updates complete.");
    }

    #region Rate Selection Logic (CASE + 10-Year Lock + Null Validation)

    private decimal GetRate(
        TblForexRate row,
        int index,
        string tenYr,
        int currencyId)
    {
        decimal?[] rates =
        {
            row.Forex0,
            row.Forex1,
            row.Forex2,
            row.Forex3,
            row.Forex4,
            row.Forex5,
            row.Forex6,
            row.Forex7,
            row.Forex8,
            row.Forex9,
            row.Forex10,
            row.Forex11,
            row.Forex12,
            row.Forex13,
            row.Forex14,
            row.Forex15,
            row.Forex16,
            row.Forex17,
            row.Forex18,
            row.Forex19,
            row.Forex20
        };

        decimal? selected =
            index >= 11 && tenYr == "Y"
                ? row.Forex10
                : rates[index];

        if (!selected.HasValue)
            throw new InvalidOperationException(
                $"Forex{index} cannot be null for CurrencyId {currencyId}");

        return selected.Value;
    }

    private decimal GetRequiredRate(
        decimal? value,
        string fieldName,
        int currencyId)
    {
        if (!value.HasValue)
            throw new InvalidOperationException(
                $"{fieldName} cannot be null for CurrencyId {currencyId}");

        return value.Value;
    }

    #endregion

    #region Upsert Logic

    private void UpsertRate(
        int currencyId,
        int year,
        int month,
        decimal rate,
        int typeId)
    {
        string yearStr = year.ToString();
        decimal roundedRate = Math.Round(rate, 5);

        var existing = _db.CurrencyExchangeRates.FirstOrDefault(x =>
            x.CurrencyId == currencyId &&
            x.Year == yearStr &&
            x.Month == month);

        if (existing != null)
        {
            existing.Rate = roundedRate;
        }
        else
        {
            _db.CurrencyExchangeRates.Add(new CurrencyExchangeRate
            {
                CurrencyId = currencyId,
                Year = yearStr,
                Month = month,
                Rate = roundedRate,
                CurrencyExchangeRateTypeId = typeId
            });
        }
    }

    #endregion
}