using AutoMapper;
using IdentityService.DataAccess.Models;
using System.Security.Claims;

namespace IdentityService.Api.Profiles
{
    /// <summary>
    /// Profile for claims mapping
    /// </summary>
    public class ClaimProfile : Profile
    {
        /// <summary>
        /// Initializes a new instance of <see cref="ClaimProfile"/>
        /// </summary>
        public ClaimProfile()
        {
            CreateMap<Claim, UserClaim>()
               .ForMember(dest => dest.ClaimType, source => source.MapFrom(source => source.Type))
               .ForMember(dest => dest.ClaimValue, source => source.MapFrom(source => source.Value))
               .ReverseMap();
        }
    }
}
