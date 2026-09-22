using AutoMapper;
using Azure.Core;
using eps_fdsudm_api.Config;
using eps_fdsudm_api.Config.Entities;
using eps_fdsudm_api.Features.Forex.Models.Dtos;


namespace eps_fdsudm_api.Features.Forex;


public class CreateForexRateHandler
{
    private readonly AppDbContext _db;
    private readonly ILogger<CreateForexRateHandler> _logger;
    private readonly IMapper _mapper;

    public CreateForexRateHandler(
        AppDbContext db,
        ILogger<CreateForexRateHandler> logger,
        IMapper mapper
        )
    {
        _db = db;
        _logger = logger;
        _mapper = mapper;
    }

    public async Task<int> Handle(CreateForexRateRequestDto request)
    {
        _logger.LogInformation("Creating forex rate for CurrencyId: {CurrencyId}", request.CurrencyId);
        TblForexRate entity = _mapper.Map<TblForexRate>(request);

        _db.TblForexRates.Add(entity);

        var result = await _db.SaveChangesAsync();

        _logger.LogInformation("Handle - Forex rate created successfully. Rows affected: {Rows}", result);

        return result;
    }

    public async Task<int> Handle(List<CreateForexRateRequestDto> requests)
    {
        _logger.LogInformation("Creating forex rates with row count: {CurrencyId}", requests.Count);

        List<TblForexRate> entities = _mapper.Map<List<TblForexRate>>(requests);

        _db.TblForexRates.AddRange(entities);
        
        var result = await _db.SaveChangesAsync();
        _logger.LogInformation("Handle - Forex rate created successfully. Rows affected: {Rows}", result);

        return result;
    }

}

