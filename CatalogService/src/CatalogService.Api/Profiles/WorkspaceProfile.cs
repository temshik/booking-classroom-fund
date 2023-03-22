using AutoMapper;
using CatalogService.Api.Requests;
using CatalogService.BusinessLogic.DTOs;
using CatalogService.DataAccess.Models;

namespace CatalogService.Api.Profiles
{
    /// <summary>
    /// The workspace mapping profile
    /// </summary>
    public class WorkspaceProfile : Profile
    {
        /// <summary>
        /// Initializes a new instance of <see cref="WorkspaceProfile"/> class.
        /// </summary>
        public WorkspaceProfile()
        {
            CreateMap<WorkspaceDTO, Workspace>()
                .ForMember(dest => dest.Id, src => src.MapFrom(x => x.Id))
                .ForMember(dest => dest.CampusNumber, src => src.MapFrom(x => x.CampusNumber))
                .ForMember(dest => dest.WorkspaceNumber, src => src.MapFrom(x => x.WorkspaceNumber))
                .ForMember(dest => dest.CategoryId, src => src.MapFrom(x => x.CategoryId))
                //.ForMember(dest => dest.Category, src => src.MapFrom(x => x.Category))
                .ForMember(dest => dest.Description, src => src.MapFrom(x => x.Description))
                .ForMember(dest => dest.NumberOfSeats, src => src.MapFrom(x => x.NumberOfSeats))
                .ForMember(dest => dest.CourseNumber, src => src.MapFrom(x => x.CourseNumber))
                .ForMember(dest => dest.SpecialEquipment, src => src.MapFrom(x => x.SpecialEquipment))
                .ReverseMap();

            CreateMap<WorkspaceRequestCreate, WorkspaceDTO>()
                .ForMember(dest => dest.CampusNumber, src => src.MapFrom(x => x.CampusNumber))
                .ForMember(dest => dest.WorkspaceNumber, src => src.MapFrom(x => x.WorkspaceNumber))
                .ForMember(dest => dest.CategoryId, src => src.MapFrom(x => x.CategoryId))
                //.ForMember(dest => dest.Category, src => src.MapFrom(x => x.Category))
                .ForMember(dest => dest.Description, src => src.MapFrom(x => x.Description))
                .ForMember(dest => dest.NumberOfSeats, src => src.MapFrom(x => x.NumberOfSeats))
                .ForMember(dest => dest.CourseNumber, src => src.MapFrom(x => x.CourseNumber))
                .ForMember(dest => dest.SpecialEquipment, src => src.MapFrom(x => x.SpecialEquipment))
                .ReverseMap();

            CreateMap<WorkspaceRequestUpdate, WorkspaceDTO>()
                .ForMember(dest => dest.CampusNumber, src => src.MapFrom(x => x.CampusNumber))
                .ForMember(dest => dest.WorkspaceNumber, src => src.MapFrom(x => x.WorkspaceNumber))
                .ForMember(dest => dest.CategoryId, src => src.MapFrom(x => x.CategoryId))
                //.ForMember(dest => dest.Category, src => src.MapFrom(x => x.Category))
                .ForMember(dest => dest.Description, src => src.MapFrom(x => x.Description))
                .ForMember(dest => dest.NumberOfSeats, src => src.MapFrom(x => x.NumberOfSeats))
                .ForMember(dest => dest.CourseNumber, src => src.MapFrom(x => x.CourseNumber))
                .ForMember(dest => dest.SpecialEquipment, src => src.MapFrom(x => x.SpecialEquipment))
                .ReverseMap();
        }
    }
}
