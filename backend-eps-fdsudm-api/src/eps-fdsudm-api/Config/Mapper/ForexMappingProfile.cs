using System;
using System.Collections.Generic;
using System.Text;

namespace eps_fdsudm_api.Config.Mapper
{
    using AutoMapper;
    using eps_fdsudm_api.Config.Entities;
    using eps_fdsudm_api.Features.Forex.Models.Dtos;

    public class ForexMappingProfile : Profile
    {
        public ForexMappingProfile()
        {
            CreateMap<CreateForexRateRequestDto, TblForexRate>();
        }
    }

}
