using eps_fdsudm_api.Config.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

using eps_fdsudm_api.Config.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace eps_fdsudm_api.Config.Entities.Configurations;

public class CurrencyExchangeRateConfiguration : IEntityTypeConfiguration<CurrencyExchangeRate>
{
    public void Configure(EntityTypeBuilder<CurrencyExchangeRate> entity)
    {
        entity.HasKey(e => new { e.CurrencyId, e.Month, e.Year }).HasName("pk__currency_exchange_rate__currency_id__month__year");
        string schema = "stage";

        if (schema == "dbo")
        {
            entity.ToTable(
                "currency_exchange_rate",
                schema,
                tb => tb.HasTrigger("currency_exchange_rate_dml_trigger"));
        }
        else
        {
            entity.ToTable("currency_exchange_rate", schema);
        }

        entity.ToTable("currency_exchange_rate", "dbo", tb => tb.HasTrigger("currency_exchange_rate_dml_trigger"));

        entity.Property(e => e.CurrencyId).HasColumnName("currency_id");
        entity.Property(e => e.Month).HasColumnName("month");
        entity.Property(e => e.Year)
            .HasMaxLength(4)
            .IsUnicode(false)
            .IsFixedLength()
            .HasColumnName("year");
        entity.Property(e => e.CurrencyExchangeRateTypeId).HasColumnName("currency_exchange_rate_type_id");
        entity.Property(e => e.Rate)
            .HasColumnType("decimal(18, 6)")
            .HasColumnName("rate");
    }

}



