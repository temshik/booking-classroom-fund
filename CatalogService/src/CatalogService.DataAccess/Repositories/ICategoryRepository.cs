using CatalogService.DataAccess.Models;

namespace CatalogService.DataAccess.Repositories
{
    /// <summary>
    /// Interface for category operations
    /// </summary>
    public interface ICategoryRepository
    {
        /// <summary>
        /// Function to add a category from the database
        /// </summary>
        /// <param name="category">The category that we want to add</param>
        void Add(Category category);

        /// <summary>
        /// Function To delete a category from the database
        /// </summary>
        /// <param name="category">The category that we want to delete</param>
        void Delete(Category category);

        /// <summary>
        /// Function to get the category from the database
        /// </summary>
        /// <returns>A List of  <see cref="Category"/></returns>
        Task<List<Category>> GetCategoriesAsync(CancellationToken cancellationToken);

        /// <summary>
        /// Function to update a category from the database
        /// </summary>
        /// <param name="category">The category that we want to update</param>
        void Update(Category category);

        /// <summary>
        /// Function to get a category from the database
        /// </summary>
        /// <param name="category">The category that we have to get</param>
        /// <returns>A Task that contains <see cref="Category"/></returns>
        Task<Category> GetCategoryAsync(int id, CancellationToken cancellationToken);
    }
}
