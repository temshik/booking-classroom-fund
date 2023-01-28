using BookingService.BusinessLogic.DTOs;

namespace BookingService.BusinessLogic.Services
{
    /// <summary>
    /// Interface for booking operations
    /// </summary>
    public interface IBookService
    {
        /// <summary>
        /// Function to create a new booking to the database.
        /// </summary>
        /// <param name="booking">The booking that we want to create</param>
        Task<BookingDTO> AddAsync(BookingDTO booking, CancellationToken cancellationToken);

        /// <summary>
        /// Function to delete a booking from the database.
        /// </summary>
        /// <param name="booking">The booking that we want to delete</param>
        Task<BookingDTO> DeleteAsync(BookingDTO booking, CancellationToken cancellationToken);

        /// <summary>
        /// Function to get the information about booking a classroom fund by WorkspaceId from the database.
        /// </summary>       
        /// <param name="workspaceId">The workspace identifier</param>
        /// <param name="cancellationToken">Cancellation token</param>
        /// <returns>A <see cref="Booking"/></returns>
        Task<List<BookingDTO>> GetBookingsByWorkspaceAsync(int workspaceId, CancellationToken cancellationToken);

        /// <summary>
        /// Function to get the information about booking a classroom fund by UserId
        /// </summary>
        /// <param name="userId">The user identifier</param>
        /// /// <param name="cancellationToken">Cancellation token</param>
        /// <returns>A List of <see cref="Booking"/></returns>
        Task<List<BookingDTO>> GetBookingsByUserAsync(int userId, CancellationToken cancellationToken);

        /// <summary>
        /// Function to update the booking to the database.
        /// </summary>
        /// <param name="booking">The booking that we want to update</param>
        Task<BookingDTO> UpdateAsync(BookingDTO booking, CancellationToken cancellationToken);

        /// <summary>
        /// Function to check if external workspace identifier is already exists in our list of models
        /// </summary>
        /// <param name="externalWorkspaceId">The external identifier of workspace</param>
        /// <returns>Boolean result</returns>
        bool IsExternalWorkspaceExists(int externalWorkspaceId);

        /// <summary>
        /// Bulk updates for updating workspaces in the database 
        /// </summary>
        /// <param name="workspaceId">The external identifier of workspace</param>
        /// <param name="value">Boolean value</param>
        void ExecuteUpdateAsync(int workspaceId, bool value);

        /// <summary>
        /// Bulk updates for deleting workspaces in the database 
        /// </summary>
        /// <param name="workspaceId">The external identifier of workspace</param>
        void ExecuteDeleteAsync(int workspaceId);
    }
}
