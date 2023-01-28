using CatalogService.DataAccess.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace CatalogService.DataAccess.Repositories
{
    /// <summary>
    /// The category repository for CRUD operations
    /// </summary>
    public class CategoryRepository : ICategoryRepository
    {
        private readonly CatalogContext _context;
        private readonly DbSet<Category> _categories;
        private readonly ILogger<CategoryRepository> _logger;

        /// <summary>
        /// Initializes a new instance of <see cref="CategoryRepository"/> class.
        /// </summary>
        /// <param name="context">The database context</param>
        /// <param name="logger">The logger</param>
        public CategoryRepository(CatalogContext context, ILogger<CategoryRepository> logger)
        {
            _context = context;
            _categories = _context.Set<Category>();
            _logger = logger;
        }

        /// <summary>
        /// Function to add a category to the database
        /// </summary>
        /// <param name="category">The category that we want to add</param>
        public void Add(Category category)
        {
            _categories.Add(category);

            _logger.LogInformation("Added the category to The database");
        }

        /// <summary>
        /// Function To delete a category from the database
        /// </summary>
        /// <param name="category">The category that we want to delete</param>
        public void Delete(Category category)
        {
            _categories.Remove(category);

            _logger.LogInformation("Deleted the category");
        }

        /// <summary>
        /// Function to get the category from the database
        /// </summary>
        /// <returns>List of Catgories</returns>
        public Task<List<Category>> GetCategoriesAsync(CancellationToken cancellationToken)
        {
            var result = _categories.AsNoTracking().ToListAsync(cancellationToken);

            _logger.LogInformation($"Geted category from database");

            return result;
        }

        /// <summary>
        /// Function to get a category from the database
        /// </summary>
        /// <param name="category">The category that we want to get</param>
        /// <returns>Task</returns>
        public async Task<Category> GetCategoryAsync(int id, CancellationToken cancellationToken)
        {
            var result = await _categories
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);

            _logger.LogInformation("Get a category from the database");

            return result;
        }

        /// <summary>
        /// Function to update a category from the database
        /// </summary>
        /// <param name="category">The category that we want to update</param>
        /// <returns>Task</returns>
        public void Update(Category category)
        {
            _categories.Update(category);

            _logger.LogInformation("Updated the category");
        }
    }
}
