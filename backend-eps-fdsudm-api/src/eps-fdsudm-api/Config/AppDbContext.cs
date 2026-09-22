using eps_fdsudm_api.Config.Entities;
using Microsoft.EntityFrameworkCore;

namespace eps_fdsudm_api.Config;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    #region - DbSets 
    public DbSet<Site> Sites => Set<Site>();
    public DbSet<Location> Locations => Set<Location>();
    public virtual DbSet<TblForexRate> TblForexRates { get; set; }
    public virtual DbSet<CurrencyExchangeRate> CurrencyExchangeRates { get; set; }
    #endregion 

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        //  Load all configuration classes automatically
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
    }
}