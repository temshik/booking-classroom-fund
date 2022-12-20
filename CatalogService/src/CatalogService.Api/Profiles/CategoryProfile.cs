using AutoMapper;
using CatalogService.Api.Requests;
using CatalogService.BusinessLogic.DTOs;
using CatalogService.DataAccess.Models;

namespace CatalogService.Api.Profiles
{
    /// <summary>
    /// The category mapping profile
    /// </summary>
    public class CategoryProfile : Profile
    {
        /// <summary>
        /// Initializes a new instance of <see cref="CategoryProfile"/> class.
        /// </summary>
        public CategoryProfile()
        {
            CreateMap<CategoryDTO, Category>()
                .ForMember(dest => dest.Name, src => src.MapFrom(x => x.Name))
                .ForMember(dest => dest.SpecialEquipment, src => src.MapFrom(x => x.SpecialEquipment))
                .ReverseMap();

            CreateMap<CategoryRequestCreate, CategoryDTO>()
                .ForMember(dest => dest.Name, src => src.MapFrom(x => x.Name))
                .ForMember(dest => dest.SpecialEquipment, src => src.MapFrom(x => x.SpecialEquipment))
                .ReverseMap();

            CreateMap<CategoryRequestUpdate, CategoryDTO>()
                .ForMember(dest => dest.Name, src => src.MapFrom(x => x.Name))
                .ForMember(dest => dest.SpecialEquipment, src => src.MapFrom(x => x.SpecialEquipment))
                .ReverseMap();
        }
    }
}
