namespace CatalogService.DataAccess.Repositories
{
    /// <summary>
    /// Interface for saving changes asynchronously at the database
    /// </summary>
    public interface ISaveChangesRepository
    {
        /// <summary>
        /// Saving changes asynchronously at the database
        /// </summary>
        /// <returns>Task</returns>
        Task SaveChangesAsync(CancellationToken cancellationToken);
    }
}
