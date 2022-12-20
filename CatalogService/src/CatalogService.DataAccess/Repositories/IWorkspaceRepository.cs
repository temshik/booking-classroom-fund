using CatalogService.DataAccess.Models;

namespace CatalogService.DataAccess.Repositories
{
    /// <summary>
    /// Interface for workspace operations
    /// </summary>
    public interface IWorkspaceRepository
    {
        /// <summary>
        /// Function to create a new workspace to the database
        /// </summary>
        /// <param name="workspace">The workspace that we want to create</param>
        void Add(Workspace workspace);

        /// <summary>
        /// Function to delete a workspace from the database
        /// </summary>
        /// <param name="workspace">The workspace that we want to delete</param>
        void Delete(Workspace workspace);

        /// <summary>
        /// Function to get a workspace from the database
        /// </summary>
        /// <param name="workspace">The workspace that we want to get</param>
        /// <returns>A <see cref="Workspace"/></returns>
        Task<Workspace> GetWorkspaceAsync(int id, CancellationToken cancellationToken);

        /// <summary>
        /// Function to get a workspace by the course number
        /// </summary>
        /// <param name="number">The number of the course</param>
        /// <returns>A List of <see cref="Workspace"/></returns>
        Task<List<Workspace>> GetWorkspaciesByCourseNumberAsync(string number, CancellationToken cancellationToken);

        /// <summary>
        /// Function to update the workspace to the database
        /// </summary>
        /// <param name="workspace">The workspace that we want to update</param>
        void Update(Workspace workspace);
    }
}
