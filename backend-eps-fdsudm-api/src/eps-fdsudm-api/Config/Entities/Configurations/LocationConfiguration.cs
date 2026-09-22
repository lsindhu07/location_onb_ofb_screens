using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace eps_fdsudm_api.Config.Entities.Configurations;
public class LocationConfiguration : IEntityTypeConfiguration<Location>
{

public void Configure(EntityTypeBuilder<Location> entity)
{




        entity.HasKey(e => e.location_id).HasName("pk__location__location_id");

        entity.ToTable("location", "dbo", tb => tb.HasTrigger("location_dml_trigger"));

        entity.HasIndex(e => new
        {
            e.location_street_address_1,
            e.location_street_address_2,
            e.location_city,
            e.location_postal_code
        }, "uq__location__address").IsUnique();

        entity.Property(e => e.cost_center)
                        .HasMaxLength(10)
                        .IsUnicode(false);
        entity.Property(e => e.location_city)
                        .HasMaxLength(50)
                        .IsUnicode(false);
        entity.Property(e => e.location_desc)
                        .HasMaxLength(2000)
                        .IsUnicode(false);
        entity.Property(e => e.location_lat).HasColumnType("decimal(18, 6)");
        entity.Property(e => e.location_long).HasColumnType("decimal(18, 6)");
        entity.Property(e => e.location_name)
                        .HasMaxLength(100)
                        .IsUnicode(false);
        entity.Property(e => e.location_postal_code)
                        .HasMaxLength(50)
                        .IsUnicode(false);
        entity.Property(e => e.location_secondary_address)
                        .HasMaxLength(255)
                        .IsUnicode(false);
        entity.Property(e => e.location_street_address_1)
                        .HasMaxLength(255)
                        .IsUnicode(false);
        entity.Property(e => e.location_street_address_2)
                        .HasMaxLength(255)
                        .IsUnicode(false);
        entity.Property(e => e.ownership_percentage)
                        .HasDefaultValue(1m, "df__location__ownership_percentage")
                        .HasColumnType("decimal(18, 4)");
        entity.Property(e => e.ref_sap_location_code)
                        .HasMaxLength(100)
                        .IsUnicode(false);
        entity.Property(e => e.sap_affiliate_code)
                        .HasMaxLength(50)
                        .IsUnicode(false);
    }
    
}


