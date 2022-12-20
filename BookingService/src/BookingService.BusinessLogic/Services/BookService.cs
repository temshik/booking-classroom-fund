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
        public async Task<List<BookingDTO>> GetBookingsAsync(List<int> workspaceId, CancellationToken cancellationToken)
        {
            var list = await _repository.GetBookingsAsync(workspaceId, cancellationToken);

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
        public async Task<List<BookingDTO>> GetBookingsPagedAsync(int userId, CancellationToken cancellationToken)
        {
            var list = await _repository.GetBookingsPagedAsync(userId, cancellationToken);

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
    }
}
