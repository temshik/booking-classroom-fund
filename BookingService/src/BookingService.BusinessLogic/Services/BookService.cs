using AutoMapper;
using BookingService.BusinessLogic.DTOs;
using BookingService.DataAccess.Models;
using BookingService.DataAccess.Repositories;
using CatalogService.DataAccess.Repositories;
using Microsoft.Extensions.Logging;

namespace BookingService.BusinessLogic.Services
{
    /// <summary>
    /// Service for base booking operations
    /// </summary>
    public class BookService : IBookService
    {
        private readonly IBookingRepository _repository;
        private readonly IMapper _mapper;
        private readonly ILogger<BookService> _logger;
        private readonly ISaveChangesRepository _saveChangesRepository;

        /// <summary>
        /// Initializes a new instance of <see cref="BookService"/> class.
        /// </summary>
        /// <param name="repository">The workspace repository.</param>
        /// <param name="mapper">The mapper.</param>
        /// <param name="logger">The logger.</param>
        public BookService(IBookingRepository repository,
            IMapper mapper,
            ILogger<BookService> logger,
            ISaveChangesRepository saveChangesRepository)
        {
            _repository = repository;
            _mapper = mapper;
            _logger = logger;
            _saveChangesRepository = saveChangesRepository;
        }

        /// <summary>
        /// Function to create a new booking to the database.
        /// </summary>
        /// <param name="booking">The booking that we want to create</param>
        public async Task<BookingDTO> AddAsync(BookingDTO booking, CancellationToken cancellationToken)
        {
            var bookingMapped = _mapper.Map<Booking>(booking);
            var bookingDatabase = await _repository.GetBookingAsync(bookingMapped.Id, cancellationToken);

            if (bookingDatabase != null)
            {
                _logger.LogError("Workspace already exists");

                return null;
            }

            _repository.AddBooking(bookingMapped);
            await _saveChangesRepository.SaveChangesAsync(cancellationToken);
            _logger.LogInformation("Added a booking in the database");

            return booking;
        }

        /// <summary>
        /// Function to delete a booking from the database.
        /// </summary>
        /// <param name="booking">The booking that we want to delete</param>
        public async Task<BookingDTO> DeleteAsync(BookingDTO booking, CancellationToken cancellationToken)
        {
            var bookingMapped = _mapper.Map<Booking>(booking);
            var bookingDatabase = await _repository.GetBookingAsync(bookingMapped.Id, cancellationToken);

            if (bookingDatabase == null)
            {
                _logger.LogError("Booking dosen't exist");
            }

            _repository.DeleteBooking(bookingMapped);
            await _saveChangesRepository.SaveChangesAsync(cancellationToken);
            _logger.LogInformation("Removed booking from the database");

            return booking;
        }

        /// <summary>
        /// Function to get the information about booking a classroom fund by WorkspaceId from the database.
        /// </summary>       
        /// <param name="workspaceId">The workspace identifier</param>
        /// <param name="cancellationToken">Cancellation token</param>
        /// <returns>A <see cref="Booking"/></returns>
        public async Task<List<BookingDTO>> GetBookingsByWorkspaceAsync(int workspaceId, CancellationToken cancellationToken)
        {
            var list = await _repository.GetBookingsByWorkspacePagedAsync(workspaceId, cancellationToken);

            if (list == null)
            {
                _logger.LogError("Workspace dosen't exist");
            }

            var listDTO = _mapper.Map<List<BookingDTO>>(list);

            return listDTO;
        }

        /// <summary>
        /// Function to get the information about booking a classroom fund by UserId
        /// </summary>
        /// <param name="userId">The user identifier</param>
        /// /// <param name="cancellationToken">Cancellation token</param>
        /// <returns>A List of <see cref="Booking"/></returns>
        public async Task<List<BookingDTO>> GetBookingsByUserAsync(int userId, CancellationToken cancellationToken)
        {
            var list = await _repository.GetBookingsByUserPagedAsync(userId, cancellationToken);

            if (list == null)
            {
                _logger.LogError("Workspace dosen't exist");
            }

            var listDTO = _mapper.Map<List<BookingDTO>>(list);

            return listDTO;
        }

        /// <summary>
        /// Function to update the booking to the database.
        /// </summary>
        /// <param name="booking">The booking that we want to update</param>
        public async Task<BookingDTO> UpdateAsync(BookingDTO booking, CancellationToken cancellationToken)
        {
            var bookingMapped = _mapper.Map<Booking>(booking);
            var bookingDatabase = await _repository.GetBookingAsync(bookingMapped.Id, cancellationToken);

            if (bookingDatabase == null)
            {
                _logger.LogError("Booking dosen't exist");
            }

            _repository.UpdateBooking(bookingMapped);
            await _saveChangesRepository.SaveChangesAsync(cancellationToken);
            _logger.LogInformation("Updated booking from the database");

            return booking;
        }

        /// <summary>
        /// Function to check if external workspace identifier is already exists in our list of models
        /// </summary>
        /// <param name="externalWorkspaceId">The external identifier of workspace</param>
        /// <param name="cancellationToken">Cancellation token</param>
        /// <returns>A <see cref="Booking"/></returns>
        /// <returns>Boolean result</returns>
        public bool IsExternalWorkspaceExists(int externalWorkspaceId)
        {
            return _repository.IsWorkspaceExists(externalWorkspaceId);
        }

        /// <summary>
        /// Bulk updates for updating workspaces in the database 
        /// </summary>
        /// <param name="workspaceId">The external identifier of workspace</param>
        /// <param name="value">Boolean value</param>
        public void ExecuteUpdateAsync(int workspaceId, bool value)
        {
            _repository.ExecuteUpdatingBlockedWorkspaces(workspaceId, value);
            _logger.LogInformation("Bookings updated in the database");
        }

        /// <summary>
        /// Bulk updates for deleting workspaces in the database 
        /// </summary>
        /// <param name="workspaceId">The external identifier of workspace</param>
        public void ExecuteDeleteAsync(int workspaceId)
        {
            _repository.ExecuteDeletingWorkspaces(workspaceId);
            _logger.LogInformation("Bookings updated in the database");
        }
    }
}
