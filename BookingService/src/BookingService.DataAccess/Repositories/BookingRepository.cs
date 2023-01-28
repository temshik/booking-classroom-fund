using BookingService.DataAccess.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace BookingService.DataAccess.Repositories
{
    /// <summary>
    /// The booking repository for CRUD operations
    /// </summary>
    public class BookingRepository : IBookingRepository
    {
        private readonly BookingContext _bookingContext;

        private readonly ILogger<BookingRepository> _logger;

        private readonly DbSet<Booking> _bookings;

        /// <summary>
        /// Initializes a new instance of <see cref="BookingRepository"/> class.
        /// </summary>
        /// <param name="context">The database context.</param>
        /// <param name="logger">The logger.</param>
        public BookingRepository(BookingContext bookingContext, ILogger<BookingRepository> logger)
        {
            _bookingContext = bookingContext;
            _logger = logger;
            _bookings = _bookingContext.Set<Booking>();
        }

        /// <summary>
        /// Function to add a booking to the database.
        /// </summary>
        /// <param name="booking">The booking that we want to add</param>
        public void AddBooking(Booking booking)
        {
            _bookings.Add(booking);

            _logger.LogInformation("Created the booking to the database");
        }

        /// <summary>
        /// Function to delete a booking from the database.
        /// </summary>
        /// <param name="booking">The booking that we want to delete</param>
        public void DeleteBooking(Booking booking)
        {
            _bookings.Remove(booking);

            _logger.LogInformation("Deleted the booking");
        }

        /// <summary>
        /// Function to check if external workspace identifier is already exists in our list of models
        /// </summary>
        /// <param name="externalWorkspaceId">The external identifier of workspace</param>
        /// <param name="cancellationToken">Cancellation token</param>
        /// <returns>A <see cref="Booking"/></returns>
        /// <returns>Boolean result</returns>
        public bool IsWorkspaceExists(int workspaceId)
        {
            return _bookings.AsNoTracking()
                .Any(p => p.WorkspaceId == workspaceId);
        }

        /// <summary>
        /// Function to get a booking by id 
        /// </summary>
        /// <param name="id">The id of the booking</param>
        /// <param name="cancellationToken">Cancellatio token</param>
        /// <returns>A <see cref="Task"/> that contains <seealso cref="Booking"/></returns>
        public Task<Booking?> GetBookingAsync(int id, CancellationToken cancellationToken)
        {
            return _bookings.AsNoTracking()
                .FirstOrDefaultAsync(order => order.Id == id, cancellationToken);
        }

        /// <summary>
        /// Function to get the booking from the database.
        /// </summary>
        /// <param name="workspaceId">The workspace identifier</param>
        /// <param name="cancellationToken">Cancellation token</param>
        /// <returns></returns>
        public Task<List<Booking>> GetBookingsByWorkspacePagedAsync(int workspaceId, CancellationToken cancellationToken)
        {
            return _bookings.Where(x => x.WorkspaceId == workspaceId)
                 .AsNoTracking()
                 .ToListAsync(cancellationToken);
        }

        /// <summary>
        /// Function to get the booking from the database.
        /// </summary>
        /// <param name="userId">The user identifier</param>
        /// <param name="cancellationToken">Cancellation token</param>
        public Task<List<Booking>> GetBookingsByUserPagedAsync(int userId, CancellationToken cancellationToken)
        {
            return _bookings.Where(x => x.UserId == userId)
                 .AsNoTracking()
                 .ToListAsync(cancellationToken);
        }

        /// <summary>
        /// Function to update a booking from the database.
        /// </summary>
        /// <param name="booking">The booking that we want to update.</param>
        /// <returns>Task</returns>
        public void UpdateBooking(Booking booking)
        {
            _bookings.Update(booking);

            _logger.LogInformation("Updated the booking");
        }

        /// <summary>
        /// Bulk updates for updating workspaces in the database 
        /// </summary>
        /// <param name="workspaceId">The external identifier of workspace</param>
        /// <param name="value">Boolean value</param>
        public void ExecuteUpdatingBlockedWorkspaces(int workspaceId, bool value)
        {
            _bookings.Where(x => x.WorkspaceId == workspaceId)
                .ExecuteUpdateAsync(s => s.SetProperty(b => b.IsWorkspaceAvailable, value));
        }

        /// <summary>
        /// Bulk updates for deleting workspaces in the database 
        /// </summary>
        /// <param name="workspaceId">The external identifier of workspace</param>
        public void ExecuteDeletingWorkspaces(int workspaceId)
        {
            _bookings.Where(x => x.WorkspaceId == workspaceId).ExecuteDeleteAsync();
        }
    }
}
