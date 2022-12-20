using BookingService.DataAccess;
using Microsoft.Extensions.Logging;

namespace CatalogService.DataAccess.Repositories
{
    /// <summary>
    /// The saving changes asynchronously at the database
    /// </summary>
    public class SaveChangesRepository : ISaveChangesRepository
    {

        private readonly BookingContext _context;

        private readonly ILogger<SaveChangesRepository> _logger;

        /// <summary>
        /// Initializes a new instance of <see cref="SaveChangesRepository"/>
        /// </summary>
        /// <param name="context">The catalog context</param>
        /// <param name="logger">The logger</param>
        public SaveChangesRepository(BookingContext context, ILogger<SaveChangesRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        /// <summary>
        /// Save changes asynchronously at the database
        /// </summary>
        /// <returns>Task</returns>
        public Task SaveChangesAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("Saving the changes to the database");

            return _context.SaveChangesAsync(cancellationToken);
        }
    }
}
