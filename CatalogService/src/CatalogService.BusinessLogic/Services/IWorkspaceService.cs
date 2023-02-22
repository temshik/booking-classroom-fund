using CatalogService.BusinessLogic.DTOs;
using CatalogService.DataAccess.Pagination;

namespace CatalogService.BusinessLogic.Services
{
    /// <summary>
    /// Interface for workspace operations
    /// </summary>
    public interface IWorkspaceService
    {
        /// <summary>
        /// Function to create a new workspace to the database.
        /// </summary>
        /// <param name="workspace">The workspace that we want to create.</param>
        /// <returns>Added workspace.</returns>
        Task AddAsync(WorkspaceDTO workspace, CancellationToken cancellationToken);

        /// <summary>
        /// Function to delete a workspace from the database.
        /// </summary>
        /// <param name="workspace">The workspace that we want to delete.</param>
        /// <returns>A <see cref="WorkspaceDTO"/>.</returns>
        Task<WorkspaceDTO> RemoveAsync(WorkspaceDTO workspace, CancellationToken cancellationToken);

        /// <summary>
        /// Function to get a workspace from the database.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task<WorkspaceDTO> GetWorkspaceAsync(int id, CancellationToken cancellationToken);

        /// <summary>
        /// Function to get a workspaces from the database by by The theory ot timetable.
        /// </summary>
        /// <param name="categoryId">Workspace category</param>
        /// <param name="courseNumber">Workspace course number</param>
        /// <param name="numberOfSeats">Workspace number of seats</param>
        /// <param name="cancellationToken">Cancellation token</param>
        /// <returns>A <see cref="WorkspaceDTO"/>.</returns>
        Task<WorkspaceDTO> GetWorkspaceAsync(WorkspaceDTO workspace, CancellationToken cancellationToken);

        /// <summary>
        /// Function to get a workspace paged.
        /// </summary>
        /// <returns>A PagedList of <see cref="WorkspaceDTO"/>.</returns>
        Task<PagedWorkspaceDTO> GetWorkspaciesPagedAsync(PagedQueryBase query, CancellationToken cancellationToken);

        /// <summary>
        /// Function to update the workspace to the database.
        /// </summary>
        /// <param name="workspace">The workspace that we want to update.</param>
        /// <returns>A <see cref="WorkspaceDTO"/>.</returns>
        Task<WorkspaceDTO> UpdateAsync(WorkspaceDTO workspace, CancellationToken cancellationToken);
    }
}
