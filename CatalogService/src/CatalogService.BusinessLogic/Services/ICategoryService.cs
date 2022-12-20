using CatalogService.BusinessLogic.DTOs;
using CatalogService.DataAccess.Models;

namespace CatalogService.BusinessLogic.Services
{
    /// <summary>
    /// Interface for category operations
    /// </summary>
    public interface ICategoryService
    {
        /// <summary>
        /// Function to add a category from the database.
        /// </summary>
        /// <param name="category">The category that we want to add.</param>
        /// <returns>A <see cref="Task"/>.</returns>
        Task AddAsync(CategoryDTO category, CancellationToken cancellationToken);

        /// <summary>
        /// Function To delete a category from the database.
        /// </summary>
        /// <param name="category">The category that we want to delete.</param>
        /// <returns>A <see cref="CategoryDTO"/>.</returns>
        Task DeleteAsync(int id, CancellationToken cancellationToken);

        /// <summary>
        /// Function to get the category from the database.
        /// </summary>
        /// <returns>A List of <see cref="CategoryDTO"/>.</returns>
        Task<List<Category>> GetCategoriesAsync(CancellationToken cancellationToken);

        /// <summary>
        /// Function to update a category from the database.
        /// </summary>
        /// <param name="category">The category that we want to update.</param>
        /// <returns>A <see cref="Task"/>.</returns>
        Task UpdateAsync(CategoryDTO category, CancellationToken cancellationToken);

        /// <summary>
        /// Function to get a category from the database.
        /// </summary>
        /// <param name="category">The category that we have to get.</param>
        /// <returns>A Task that contains <see cref="Category"/>.</returns>
        Task<CategoryDTO> GetCategoryAsync(CategoryDTO category, CancellationToken cancellationToken);
    }
}
