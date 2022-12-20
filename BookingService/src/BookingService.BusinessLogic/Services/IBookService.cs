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
        Task<List<BookingDTO>> GetBookingsAsync(List<int> workspaceId, CancellationToken cancellationToken);

        /// <summary>
        /// Function to get the information about booking a classroom fund by UserId
        /// </summary>
        /// <param name="userId">The user identifier</param>
        /// /// <param name="cancellationToken">Cancellation token</param>
        /// <returns>A List of <see cref="Booking"/></returns>
        Task<List<BookingDTO>> GetBookingsPagedAsync(int userId, CancellationToken cancellationToken);

        /// <summary>
        /// Function to update the booking to the database.
        /// </summary>
        /// <param name="booking">The booking that we want to update</param>
        Task<BookingDTO> UpdateAsync(BookingDTO booking, CancellationToken cancellationToken);
    }
}
