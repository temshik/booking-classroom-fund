using Microsoft.Extensions.Logging;

namespace IdentityService.DataAccess.Repository
{
    /// <summary>
    /// The saving changes asynchronously at the database
    /// </summary>
    public class SaveChangesRepository : ISaveChangesRepository
    {
        private readonly IdentityContext _context;

        private readonly ILogger<SaveChangesRepository> _logger;

        /// <summary>
        /// Initializes a new instance of <see cref="SaveChangesRepository"/>
        /// </summary>
        /// <param name="context">The identity context</param>
        /// <param name="logger">The logger</param>
        public SaveChangesRepository(IdentityContext context, ILogger<SaveChangesRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        /// <summary>
        /// Save changes asynchronously at the database
        /// </summary>
        /// <param name="cancellationToken">The cancellation token</param>
        /// <returns>Task</returns>
        public Task SaveChangesAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("Saving the changes to the database");

            return _context.SaveChangesAsync(cancellationToken);
        }
    }
}
