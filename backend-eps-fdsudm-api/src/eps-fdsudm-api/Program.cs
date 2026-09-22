using eps_fdsudm_api.Config;
using eps_fdsudm_api.Config.Mapper;
using eps_fdsudm_api.Features.BusinessLine;
using eps_fdsudm_api.Features.City;
using eps_fdsudm_api.Features.Contact;
using eps_fdsudm_api.Features.Country;
using eps_fdsudm_api.Features.Forex;
using eps_fdsudm_api.Features.FuelBrand;
using eps_fdsudm_api.Features.HealthCheck.Ping;
using eps_fdsudm_api.Features.Location;
using eps_fdsudm_api.Features.LocationOperationType;
using eps_fdsudm_api.Features.LocationPrimaryUseType;
using eps_fdsudm_api.Features.OperationStatus;
using eps_fdsudm_api.Features.Site;
using eps_fdsudm_api.Features.StoreBrand;
using eps_fdsudm_api.Features.Zone;
using eps_fdsudm_api.Shared.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Scalar.AspNetCore;
using Scrutor;

#region - App Setup
Console.WriteLine($"ASPNETCORE_ENVIRONMENT: {Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT")}");
foreach (System.Collections.DictionaryEntry e in Environment.GetEnvironmentVariables())
{
    if (e.Key.ToString().Contains("ENVIRONMENT") || e.Key.ToString().Contains("ASPNETCORE") || e.Key.ToString().Contains("DOTNET"))
        Console.WriteLine($"{e.Key} = {e.Value}");
}
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendPolicy", policy =>
    {
        var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>() ?? Array.Empty<string>();

        if (allowedOrigins.Length > 0)
        {
            policy.WithOrigins(allowedOrigins)
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        }
    });
});


builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();
var defaultConnectionString = builder.Configuration.GetValue<string>("ConnectionStrings:UDM_2");
Console.WriteLine($"defaultConnectionString: {defaultConnectionString}");
RegisterDbContext();


// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();



RegisterMappings();
RegisterFeatures();

Console.WriteLine($"Builder Current Environment: {builder.Environment.EnvironmentName}");
Console.WriteLine($"Builder Current Context: {builder.Environment.ContentRootPath}");
var app = builder.Build();
//foreach (var c in app.Configuration.AsEnumerable()) { Console.WriteLine($"CONFIG: Key: {c.Key} Value: {c.Value}"); }

app.UseCors("FrontendPolicy");

app.MapControllers();

string currEnv = app.Environment.EnvironmentName;
AppEnvironment envEnum = app.Environment.AsEnum();
Console.WriteLine($"Current Environment: {currEnv}");
Console.WriteLine($"Current envEnum: {envEnum}");


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
    //app.UseSwagger();
    //app.UseSwaggerUI();

}
RegisterEndpoints();

//app.UseHttpsRedirection();

//set ASPNETCORE_ENVIRONMENT=Development
//set set ASPNETCORE_ENVIRONMENT=Local
app.Run();
#endregion

#region - Registers
void RegisterMappings()
{
    builder.Services.AddAutoMapper(typeof(ForexMappingProfile));
}

void RegisterDbContext()
{
    string UDM_2_CONN_NAME = "UDM_2";

    var conn = builder.Configuration.GetConnectionString(UDM_2_CONN_NAME);
    Console.WriteLine($"Connection string: {conn}");


    builder.Services.AddDbContext<AppDbContext>(options =>
        options.UseSqlServer(conn)
        );
}

void RegisterFeatures()
{
    var featureTypes = AppDomain.CurrentDomain
    .GetAssemblies()
    .SelectMany(a => a.GetTypes())
    .Where(t =>
        typeof(IFeatureDependency).IsAssignableFrom(t) &&
        !t.IsInterface &&
        !t.IsAbstract);

    foreach (var type in featureTypes)
    {
        var instance = Activator.CreateInstance(type) as IFeatureDependency;

        if (instance != null)
        {
            Console.WriteLine($"Executing Register for {type.Name}");
            instance.Register(builder.Services);
        }
    }

}


void RegisterEndpoints()
{
    PingEndpoint.Map(app);
    ZoneEndpoints.Map(app);
    ForexEndpoints.Map(app);
    LocationEndpoints.Map(app);
    SiteEndpoints.Map(app);
    CountryEndpoints.Map(app);
    CityEndpoints.Map(app);
    OperationStatusEndpoints.Map(app);
    BusinessLineEndpoints.Map(app);
    LocationPrimaryUseTypeEndpoints.Map(app);
    LocationOperationTypeEndpoints.Map(app);
    ContactEndpoints.Map(app);
    FuelBrandEndpoints.Map(app);
    StoreBrandEndpoints.Map(app);
}
#endregion