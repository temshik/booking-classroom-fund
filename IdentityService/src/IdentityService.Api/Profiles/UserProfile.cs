using AutoMapper;
using IdentityService.Api.Requests;
using IdentityService.BusinessLogic.DTOs;
using IdentityService.DataAccess.Models;

namespace IdentityService.Api.Profiles
{
    /// <summary>
    /// Profile for user mapping
    /// </summary>
    public class UserProfile : Profile
    {
        /// <summary>
        /// Initializes a new instance of <see cref="UserProfile"/>
        /// </summary>
        public UserProfile()
        {
            CreateMap<UserDTO, User>()
                    .ForMember(dest => dest.Id, src => src.MapFrom(src => src.Id))
                    .ForMember(dest => dest.Email, src => src.MapFrom(src => src.Email))
                    .ForMember(dest => dest.FirstName, src => src.MapFrom(src => src.FirstName))
                    .ForMember(dest => dest.LastName, src => src.MapFrom(src => src.LastName))
                    .ForMember(dest => dest.UserName, src => src.MapFrom(src => src.UserName))
                    .ForMember(dest => dest.RegistrationDate, src => src.MapFrom(src => src.RegistrationDate))
                    .ReverseMap();

            CreateMap<UserDTO, UserRequestCreate>()
                    .ForMember(dest => dest.Email, src => src.MapFrom(src => src.Email))
                    .ForMember(dest => dest.FirstName, src => src.MapFrom(src => src.FirstName))
                    .ForMember(dest => dest.LastName, src => src.MapFrom(src => src.LastName))
                    .ForMember(dest => dest.UserName, src => src.MapFrom(src => src.UserName))
                    .ReverseMap();

            CreateMap<UserDTO, UserRequestUpdate>()
                    .ForMember(dest => dest.Email, src => src.MapFrom(src => src.Email))
                    .ForMember(dest => dest.UserName, src => src.MapFrom(src => src.UserName))
                    .ReverseMap();

            CreateMap<UserDTO, UserRequestLogin>()
                    .ForMember(dest => dest.Email, source => source.MapFrom(source => source.Email))
                    .ReverseMap();

        }
    }
}
