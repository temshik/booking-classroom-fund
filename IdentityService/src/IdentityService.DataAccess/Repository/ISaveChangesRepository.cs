namespace IdentityService.DataAccess.Repository
{
    /// <summary>
    /// Interface for saving changes asynchronously at the database
    /// </summary>
    public interface ISaveChangesRepository
    {
        /// <summary>
        /// Saving changes asynchronously at the database
        /// </summary>
        /// <param name="cancellationToken">The cancellation token</param>
        /// <returns>Task</returns>
        Task SaveChangesAsync(CancellationToken cancellationToken);
    }
}
