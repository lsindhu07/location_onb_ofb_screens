using eps_fdsudm_api.Config.Entities;
using eps_fdsudm_api.Features.Forex.Models.Dtos;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;

namespace eps_fdsudm_api.Features.Forex;

[ApiController]
[Route("/forex")]
public class ForexRatesController : ControllerBase
{

    public ForexRatesController()
    {

    }
    [HttpPost("rate/{tenYear}")]
    public async Task<IActionResult> TriggerRateUpdate(
        string tenYear,
         [FromServices] TriggerRateUpdateHandler handler
        )
    {
        var result = await handler.Handle(tenYear);

        return Ok(result);
    }
    [HttpPost("v2/rate/{tenYear}")]
    public async Task<IActionResult> UpdateRate(
    string tenYear,
     [FromServices] UpdateForexRatesHandler handler
    )
    {

        if (tenYear != "Y" && tenYear != "N")
        {
            return BadRequest("tenYr must be 'Y' or 'N'.");
        }

        await handler.Handle(tenYear);

        return Ok(new
        {
            Message = "Forex rates update completed successfully.",
            TenYearLock = tenYear
        });

    }
    [HttpPost]
    public async Task<IActionResult> CreateRateItem(
        CreateForexRateRequestDto requestDto,
        [FromServices] CreateForexRateHandler handler
        )
    {
        var result = await handler.Handle(requestDto);

        return Ok(result);
    }

    [HttpPost("/list")]
    public async Task<IActionResult> CreateRateItems(
    CreateForexRateRequestDto requestDto,
    [FromServices] CreateForexRateHandler handler)
    {
        var result = await handler.Handle(requestDto);

        return Ok(result);
    }
}

