using System;
using System.Collections.Generic;
using eps_fdsudm_api.Config.Entities;
using Microsoft.EntityFrameworkCore;

namespace eps_fdsudm_api.Config;

public partial class TempDbContext : DbContext
{
    public TempDbContext(DbContextOptions<TempDbContext> options)
        : base(options)
    {
    }



    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<CurrencyExchangeRate>(entity =>
        {

        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
