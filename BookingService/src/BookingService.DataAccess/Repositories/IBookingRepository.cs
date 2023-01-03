using BookingService.DataAccess.Models;

namespace BookingService.DataAccess.Repositories
{
    /// <summary>
    /// Interface for booking operations
    /// </summary>
    public interface IBookingRepository
    {
        /// <summary>
        /// Function to create a new booking to the database.
        /// </summary>
        /// <param name="booking">The booking that we want to create</param>
        void AddBooking(Booking booking);

        /// <summary>
        /// Function to delete a booking from the database.
        /// </summary>
        /// <param name="booking">The booking that we want to delete</param>
        void DeleteBooking(Booking booking);

        /// <summary>
        /// Function to update the booking to the database.
        /// </summary>
        /// <param name="booking">The booking that we want to update</param>
        void UpdateBooking(Booking booking);

        /// <summary>
        /// Function to get a booking by id 
        /// </summary>
        /// <param name="id">The id of the booking</param>
        /// <param name="cancellationToken">The cancellation token</param>
        /// <returns></returns>
        Task<Booking?> GetBookingAsync(int id, CancellationToken cancellationToken);

        /// <summary>
        /// Function to get the information about booking a classroom fund by WorkspaceId from the database.
        /// </summary>       
        /// <param name="workspaceId">The workspace identifier</param>
        /// <param name="cancellationToken">Cancellation token</param>
        /// <returns>A <see cref="Booking"/></returns>
        Task<List<Booking>> GetBookingsByWorkspacePagedAsync(int workspaceId, CancellationToken cancellationToken);

        /// <summary>
        /// Function to get the information about booking a classroom fund by UserId
        /// </summary>
        /// <param name="userId">The user identifier</param>
        /// /// <param name="cancellationToken">Cancellation token</param>
        /// <returns>A List of <see cref="Booking"/></returns>
        Task<List<Booking>> GetBookingsByUserPagedAsync(int userId, CancellationToken cancellationToken);

        /// <summary>
        /// Function to check if external workspace identifier is already exists in our list of models
        /// </summary>
        /// <param name="workspaceId">The external identifier of workspace</param>
        /// <returns>Boolean result</returns>
        bool IsWorkspaceExists(int workspaceId);

        /// <summary>
        /// Bulk updates for updating workspaces in the database 
        /// </summary>
        /// <param name="workspaceId">The external identifier of workspace</param>
        /// <param name="value">Boolean value</param>
        void ExecuteUpdatingBlockedWorkspaces(int workspaceId, bool value);

        /// <summary>
        /// Bulk updates for deleting workspaces in the database 
        /// </summary>
        /// <param name="workspaceId">The external identifier of workspace</param>
        void ExecuteDeletingWorkspaces(int workspaceId);
    }
}
