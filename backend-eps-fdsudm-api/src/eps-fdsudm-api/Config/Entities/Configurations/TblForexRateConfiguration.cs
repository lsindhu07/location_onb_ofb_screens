using eps_fdsudm_api.Config.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace eps_fdsudm_api.Config.Entities.Configurations;


public class TblForexRateConfiguration : IEntityTypeConfiguration<TblForexRate>
{
    public void Configure(EntityTypeBuilder<TblForexRate> entity)
    {
        
        entity
                
                .ToTable("tbl_forex_rates", "dbo");
        entity.HasKey(e => e.id);
        entity.Property(e => e.CurrencyId).HasColumnName("currency_id");
        entity.Property(e => e.Forex0)
            .HasColumnType("decimal(18,6)")
            .HasColumnName("forex_0");
        entity.Property(e => e.Forex1)
            .HasColumnType("decimal(18,6)")
            .HasColumnName("forex_1");
        entity.Property(e => e.Forex10)
            .HasColumnType("decimal(18,6)")
            .HasColumnName("forex_10");
        entity.Property(e => e.Forex11)
            .HasColumnType("decimal(18,6)")
            .HasColumnName("forex_11");
        entity.Property(e => e.Forex12)
            .HasColumnType("decimal(18,6)")
            .HasColumnName("forex_12");
        entity.Property(e => e.Forex13)
            .HasColumnType("decimal(18,6)")
            .HasColumnName("forex_13");
        entity.Property(e => e.Forex14)
            .HasColumnType("decimal(18,6)")
            .HasColumnName("forex_14");
        entity.Property(e => e.Forex15)
            .HasColumnType("decimal(18,6)")
            .HasColumnName("forex_15");
        entity.Property(e => e.Forex16)
            .HasColumnType("decimal(18,6)")
            .HasColumnName("forex_16");
        entity.Property(e => e.Forex17)
            .HasColumnType("decimal(18,6)")
            .HasColumnName("forex_17");
        entity.Property(e => e.Forex18)
            .HasColumnType("decimal(18,6)")
            .HasColumnName("forex_18");
        entity.Property(e => e.Forex19)
            .HasColumnType("decimal(18,6)")
            .HasColumnName("forex_19");
        entity.Property(e => e.Forex2)
            .HasColumnType("decimal(18,6)")
            .HasColumnName("forex_2");
        entity.Property(e => e.Forex20)
            .HasColumnType("decimal(18,6)")
            .HasColumnName("forex_20");
        entity.Property(e => e.Forex3)
            .HasColumnType("decimal(18,6)")
            .HasColumnName("forex_3");
        entity.Property(e => e.Forex4)
            .HasColumnType("decimal(18,6)")
            .HasColumnName("forex_4");
        entity.Property(e => e.Forex5)
            .HasColumnType("decimal(18,6)")
            .HasColumnName("forex_5");
        entity.Property(e => e.Forex6)
            .HasColumnType("decimal(18,6)")
            .HasColumnName("forex_6");
        entity.Property(e => e.Forex7)
            .HasColumnType("decimal(18,6)")
            .HasColumnName("forex_7");
        entity.Property(e => e.Forex8)
            .HasColumnType("decimal(18,6)")
            .HasColumnName("forex_8");
        entity.Property(e => e.Forex9)
            .HasColumnType("decimal(18,6)")
            .HasColumnName("forex_9");
    }

}