using AutoMapper;
using BookingService.Api.Requests;
using BookingService.BusinessLogic.DTOs;
using BookingService.DataAccess.Models;

namespace BookingService.Api.Profiles
{
    /// <summary>
    /// The booking mapping profile
    /// </summary>
    public class BookingProfile : Profile 
    {
        /// <summary>
        /// Initializes a new instance of <see cref="BookingProfile"/> class.
        /// </summary>
        public BookingProfile()
        {
            CreateMap<BookingDTO, Booking>()
                .ForMember(dest => dest.Id, src => src.MapFrom(x => x.Id))
                .ForMember(dest => dest.UserId, src => src.MapFrom(x => x.UserId))
                .ForMember(dest => dest.WorkspaceId, src => src.MapFrom(x => x.WorkspaceId))
                .ForMember(dest => dest.DayOfWeek, src => src.MapFrom(x => x.DayOfWeek))
                .ForMember(dest => dest.StartBookingTime, src => src.MapFrom(x => x.StartBookingTime))
                .ForMember(dest => dest.GroupNumber, src => src.MapFrom(x => x.GroupNumber))
                .ReverseMap();

            CreateMap<BookingRequest, BookingDTO>()
                .ForMember(dest => dest.UserId, src => src.MapFrom(x => x.UserId))
                .ForMember(dest => dest.WorkspaceId, src => src.MapFrom(x => x.WorkspaceId))
                .ForMember(dest => dest.DayOfWeek, src => src.MapFrom(x => x.DayOfWeek))
                .ForMember(dest => dest.StartBookingTime, src => src.MapFrom(x => x.StartBookingTime))
                .ForMember(dest => dest.GroupNumber, src => src.MapFrom(x => x.GroupNumber))
                .ReverseMap();
        }
    }
}
