using CatalogService.DataAccess.Models;
using CatalogService.DataAccess.Pagination;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace CatalogService.DataAccess.Repositories
{
    /// <summary>
    /// The workspace repository for CRUD operations
    /// </summary>
    public class WorkspaceRepository : IWorkspaceRepository
    {
        private readonly CatalogContext _context;
        private readonly DbSet<Workspace> _workspaces;
        private readonly ILogger<WorkspaceRepository> _logger;

        /// <summary>
        /// Initializes a new instance of <see cref="WorkspaceRepository"/>
        /// </summary>
        /// <param name="context"></param>
        /// <param name="logger"></param>
        public WorkspaceRepository(CatalogContext context, ILogger<WorkspaceRepository> logger)
        {
            _context = context;
            _workspaces = _context.Set<Workspace>();
            _logger = logger;
        }

        /// <summary>
        /// Function to create a new workspace to the database
        /// </summary>
        /// <param name="workspace">The workspace that we want to create</param>
        public void Add(Workspace workspace)
        {
            _workspaces.Add(workspace);

            _logger.LogInformation("Added the workspace to the database");
        }

        /// <summary>
        /// Function to delete a workspace from the database
        /// </summary>
        /// <param name="workspace">The workspace that we want to delete</param>
        /// <returns>Task</returns>
        public void Delete(Workspace workspace)
        {
            _workspaces.Remove(workspace);

            _logger.LogInformation("Deleted a workspace from the database");
        }

        /// <summary>
        /// Function to get a workspace from the database
        /// </summary>
        /// <param name="workspace">The workspace that we want to get</param>
        /// <returns>Task</returns>
        public Task<Workspace> GetWorkspaceAsync(int id, CancellationToken cancellationToken)
        {
            var result = _workspaces
                .Include(x => x.Category)
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);

            _logger.LogInformation("Get the workspace from the database");

            return result;
        }

        /// <summary>
        /// Function to get a workspace by the course number
        /// </summary>
        /// <param name="number">The number of the course</param>
        /// <returns>list of workspaceies</returns>
        public async Task<PagedList<Workspace>> GetWorkspaciesPagedAsync(PagedQueryBase query, CancellationToken cancellationToken)
        {
            /*var result = _workspaces
                .Where(x => x.CourseNumber.ToString() == number)
                .ToListAsync(cancellationToken);

            _logger.LogInformation("Get the workspace from the database by course number");

            return result;*/

            try
            {
                return await _workspaces
                            .AsNoTracking()
                            .Sort(query.SortOn, query.SortDirection)
                            .ToPagedListAsync(query);

            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong in the {nameof(GetWorkspaciesPagedAsync)} action {ex}");
                return new PagedList<Workspace>(new List<Workspace>(), 0, 0, 0);
            }
        }

        /// <summary>
        /// Function to update the workspace to the database
        /// </summary>
        /// <param name="workspace">The workspace that we want to update</param>
        public void Update(Workspace workspace)
        {
            _workspaces.Update(workspace);

            _logger.LogInformation("Updated the workspace to the database");
        }
    }
}
