using AutoMapper;
using IdentityService.Api.Requests;
using IdentityService.BusinessLogic.DTOs;

namespace IdentityService.Api.Profiles
{
    /// <summary>
    /// Profile for user mapping
    /// </summary>
    public class PasswordProfile : Profile
    {
        /// <summary>
        /// Initializes a new instance of <see cref="PasswordProfile"/>
        /// </summary>
        public PasswordProfile()
        {
            CreateMap<PasswordDTO, PasswordRequestUpdate>()
                .ForMember(dest => dest.Email, src => src.MapFrom(src => src.Email))
                .ForMember(dest => dest.NewPassword, src => src.MapFrom(src => src.NewPassword))
                .ForMember(dest => dest.OldPassword, src => src.MapFrom(src => src.OldPassword))
                .ReverseMap();

            CreateMap<PasswordDTO, PasswordRequestReset>()
                .ForMember(dest => dest.Email, src => src.MapFrom(src => src.Email))
                .ForMember(dest => dest.Password, src => src.MapFrom(src => src.NewPassword))
                .ReverseMap();
        }
    }
}
