using eps_fdsudm_api.Config.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class SiteConfiguration : IEntityTypeConfiguration<Site>
{
    public void Configure(EntityTypeBuilder<Site> entity)
    {
        entity.HasKey(e => e.site_id)
            .HasName("pk__site__site_id");

        entity.ToTable("site", "dbo",
            tb => tb.HasTrigger("site_dml_trigger"));

        entity.HasIndex(e => e.site_code)
            .IsUnique()
            .HasDatabaseName("uq__site__site_code");

        entity.HasIndex(e => e.site_name)
            .IsUnique()
            .HasDatabaseName("uq__site__site_name");

        entity.Property(e => e.site_code)
            .HasMaxLength(20)
            .IsUnicode(false);

        entity.Property(e => e.site_name)
            .HasMaxLength(200)
            .IsUnicode(false);
    }

}