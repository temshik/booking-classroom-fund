using AutoMapper;
using CatalogService.BusinessLogic.DTOs;
using CatalogService.BusinessLogic.Exceptions;
using CatalogService.DataAccess.Models;
using CatalogService.DataAccess.Repositories;
using IdentityService.BusinessLogic.Exceptions;
using Microsoft.Extensions.Logging;

namespace CatalogService.BusinessLogic.Services
{
    /// <summary>
    /// Service for base category operations
    /// </summary>
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _repository;
        private readonly IMapper _mapper;
        private readonly ILogger<CategoryService> _logger;
        private readonly ISaveChangesRepository _saveChangesRepository;

        /// <summary>
        /// Initializes a new instance of <see cref="CategoryService"/> class.
        /// </summary>
        /// <param name="repository">The category repository.</param>
        /// <param name="mapper">The mapper.</param>
        /// <param name="logger">The logger.</param>
        public CategoryService(ICategoryRepository repository,
            IMapper mapper,
            ILogger<CategoryService> logger,
            ISaveChangesRepository saveChangesRepository)
        {
            _repository = repository;
            _mapper = mapper;
            _logger = logger;
            _saveChangesRepository = saveChangesRepository;
        }

        /// <summary>
        /// Function to add a category from the database.
        /// </summary>
        /// <param name="category">The category that we want to add.</param>
        /// <returns>A <see cref="Task"/>.</returns>
        public async Task AddAsync(CategoryDTO category, CancellationToken cancellationToken)
        {
            var categoryMapped = _mapper.Map<Category>(category);
            var categoryDatabase = await _repository.GetCategoryAsync(categoryMapped.Id, cancellationToken);

            if (categoryDatabase != null)
            {
                _logger.LogError("The category already exists");

                throw new AlreadyExistException("Category already exists");
            }

            _repository.Add(categoryMapped);
            await _saveChangesRepository.SaveChangesAsync();
        }

        /// <summary>
        /// Function To delete a category from the database.
        /// </summary>
        /// <param name="category">The category that we want to delete.</param>
        /// <returns>A <see cref="CategoryDTO"/>.</returns>
        public async Task DeleteAsync(int id, CancellationToken cancellationToken)
        {
            var categoryDatabase = await _repository.GetCategoryAsync(id, cancellationToken);

            if (categoryDatabase == null)
            {
                _logger.LogError("The category dosen't exist");

                throw new NotFoundException("The category was not found");
            }

            _repository.Delete(_mapper.Map<Category>(categoryDatabase));
            await _saveChangesRepository.SaveChangesAsync();
            _logger.LogInformation("Category deleted from the database");
        }

        /// <summary>
        /// Function to get the category from the database.
        /// </summary>
        /// <returns>A List of <see cref="CategoryDTO"/>.</returns>
        public async Task<List<CategoryDTO>> GetCategoriesAsync(CancellationToken cancellationToken)
        {
            var list = _mapper.Map<List<CategoryDTO>>(await _repository.GetCategoriesAsync(cancellationToken));

            if (list == null)
            {
                _logger.LogError("The category dosen't exist");

                throw new NotFoundException("The category was not found");
            }

            return list;
        }

        /// <summary>
        /// Function to get a category from the database.
        /// </summary>
        /// <param name="category">The category that we have to get.</param>
        /// <returns>A Task that contains <see cref="Category"/>.</returns>
        public async Task<CategoryDTO> GetCategoryAsync(CategoryDTO category, CancellationToken cancellationToken)
        {
            var categoryMapped = _mapper.Map<Category>(category);
            var categoryDatabase = _repository.GetCategoryAsync(categoryMapped.Id, cancellationToken);

            if (categoryDatabase == null)
            {
                _logger.LogError("The category dosen't exist");

                throw new NotFoundException("The category was not found");
            }

            return category;
        }

        /// <summary>
        /// Function to update a category from the database.
        /// </summary>
        /// <param name="category">The category that we want to update.</param>
        /// <returns>A <see cref="Task"/>.</returns>
        public async Task UpdateAsync(CategoryDTO category, CancellationToken cancellationToken)
        {
            var categoryMapped = _mapper.Map<Category>(category);
            var categoryDatabase = await _repository.GetCategoryAsync(categoryMapped.Id, cancellationToken);

            if (categoryDatabase == null)
            {
                _logger.LogError("The category dosen't exist");

                throw new NotFoundException("The category was not found");
            }

            _repository.Update(categoryMapped);
            await _saveChangesRepository.SaveChangesAsync();
            _logger.LogInformation("Category updated in the database");
        }
    }
}
