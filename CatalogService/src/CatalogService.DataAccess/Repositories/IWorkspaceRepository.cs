using CatalogService.DataAccess.Models;
using CatalogService.DataAccess.Pagination;

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
        /// Function to get a workspace from the database
        /// </summary>
        /// <param name="campusNumber">The workspace campus number that we want to get.</param>
        /// <param name="workspaceNumber">The workspace number that we want to get.</param>
        /// <returns>A <see cref="Workspace"/></returns>
        Task<Workspace> GetWorkspaceByLocationAsync(int campusNumber, int workspaceNumber, CancellationToken cancellationToken);

        /// <summary>
        /// Function to get a paged workspace
        /// </summary>
        /// <param name="number">The number of the course</param>
        /// <returns>A List of <see cref="Workspace"/></returns>
        Task<PagedList<Workspace>> GetWorkspaciesPagedAsync(PagedQueryBase query, Workspace workspace, CancellationToken cancellationToken);

        /// <summary>
        /// Function to update the workspace to the database
        /// </summary>
        /// <param name="workspace">The workspace that we want to update</param>
        void Update(Workspace workspace);
    }
}
