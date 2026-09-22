using System;
using System.Collections.Generic;

namespace eps_fdsudm_api.Config.Entities;

public partial class CurrencyExchangeRate
{
    public int CurrencyId { get; set; }

    public int Month { get; set; }

    public string Year { get; set; } = null!;

    public decimal Rate { get; set; }

    public int CurrencyExchangeRateTypeId { get; set; }
}
