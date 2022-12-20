using AutoMapper;
using CatalogService.Api.Requests;
using CatalogService.BusinessLogic.DTOs;
using CatalogService.BusinessLogic.Services;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace CatalogService.Api.Controllers
{
    /// <summary>
    /// The categories controller
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryService _service;

        private readonly IMapper _mapper;

        /// <summary>
        /// Initializes a new instance of <see cref="CategoriesController"/> class.
        /// </summary>
        /// <param name="service">Category service.</param>
        /// <param name="mapper">AutoMapper registration.</param>
        public CategoriesController(ICategoryService service,
            IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }

        /// <summary>
        /// Get information about the entire categories
        /// </summary>
        /// <param name="cancellationToken">Cancellation token</param>
        /// <returns>List of categories</returns>
        [Route("[action]")]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetCategories(CancellationToken cancellationToken)
        {
            var result = await _service.GetCategoriesAsync(cancellationToken);

            if (result == null)
            {
                return BadRequest(); 
            }

            return Ok(result);
        }

        /// <summary>
        /// Creates a new category.
        /// </summary>
        /// <param name="cancellationToken">Cancellation token.</param>
        /// <returns>New category.</returns>
        [Route("[action]")]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> CreateCategory([FromBody] CategoryRequestCreate categoryRequest, CancellationToken cancellationToken)
        {
            await _service.AddAsync(_mapper.Map<CategoryDTO>(categoryRequest), cancellationToken);

            return Ok(categoryRequest);
        }

        /// <summary>
        /// Updates a category.
        /// </summary>
        /// <param name="cancellationToken">Cancellation token.</param>
        /// <returns>Updated category.</returns>
        [HttpPut("[action]")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> UpdateCategory([FromBody] CategoryRequestUpdate categoryRequest, CancellationToken cancellationToken)
        {
            await _service.UpdateAsync(_mapper.Map<CategoryDTO>(categoryRequest), cancellationToken);

            return Ok(categoryRequest);
        }

        /// <summary>
        /// Deletes a specific category.
        /// </summary>
        /// <param name="cancellationToken">Cancellation token.</param>
        /// <returns>Updated list of categories.</returns>
        [Route("[action]/{id}")]
        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> DeleteCategory(int id, CancellationToken cancellationToken)
        {
            await _service.DeleteAsync(id, cancellationToken);

            return Ok(id);
        }
    }
}
