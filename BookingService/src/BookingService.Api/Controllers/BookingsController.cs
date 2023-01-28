using AutoMapper;
using BookingService.Api.Requests;
using BookingService.BusinessLogic.DTOs;
using BookingService.BusinessLogic.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BookingService.Api.Controllers
{
    /// <summary>
    /// Bookings controller
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class BookingsController : ControllerBase
    {
        private readonly IBookService _bookService;
        private readonly IMapper _mapper;
        /// <summary>
        /// Initialzez a new instance of the <see cref="BookingsController" /> class.
        /// </summary>
        public BookingsController(IBookService bookService, IMapper mapper)
        {
            _bookService = bookService;
            _mapper = mapper;
        }

        /// <summary>
        /// Creates a new booking
        /// </summary>
        /// <param name="bookingRequest">Data of the booking that we want to create</param>
        /// <param name="cancellationToken">Cancellation token</param>
        /// <returns>New booking</returns>
        [Route("[action]")]
        [HttpPost]
        [Authorize(Roles = "Dispacher, Employee")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> CreateBooking([FromBody] BookingRequest bookingRequest, CancellationToken cancellationToken)
        {
            var result = await _bookService.AddAsync(_mapper.Map<BookingDTO>(bookingRequest), cancellationToken);

            if (result != null)
            {
                return Ok(result);
            }

            return BadRequest();
        }

        /// <summary>
        /// Updates booking info
        /// </summary>
        /// <param name="id">Specific booking id</param>
        /// <param name="bookingRequest">Data of the booking that we want to update</param>
        /// <param name="cancellationToken">Cancellation token</param>
        /// <returns>Updated booking</returns>
        [Route("[action]")]
        [HttpPut]
        [Authorize(Roles = "Dispacher, Employee")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateBooking([FromBody] BookingRequest bookingRequest, CancellationToken cancellationToken)
        {
            var result = await _bookService.UpdateAsync(_mapper.Map<BookingDTO>(bookingRequest), cancellationToken);

            if (result != null)
            {
                return Ok(result);
            }

            return BadRequest();
        }

        /// <summary>
        /// Delete the booking
        /// </summary>
        /// <param name="id">Specific booking id</param>
        /// <param name="cancellationToken">Cancellation token</param>
        /// <returns>Updated list of bookings</returns>
        [Route("[action]")]
        [HttpDelete]
        [Authorize(Roles = "Dispacher, Employee")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> DeleteBooking([FromBody] BookingRequest bookingRequest, CancellationToken cancellationToken)
        {
            var result = await _bookService.DeleteAsync(_mapper.Map<BookingDTO>(bookingRequest), cancellationToken);

            if (result != null)
            {
                return Ok(result);
            }

            return BadRequest();
        }

        /// <summary>
        /// Get the information about bookings of a classroom fund by WorkspaceId
        /// </summary>
        /// <param name="workspaceId">Workspace identifier</param>
        /// <param name="cancellationToken">Cancellation token</param>
        /// <returns>Bookings</returns>
        [Route("[action]/{workspaceId}")]
        [HttpPut]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetBookingsByWorkspace(int workspaceId, CancellationToken cancellationToken)
        {
            var list = await _bookService.GetBookingsByWorkspaceAsync(workspaceId, cancellationToken);

            if (list == null)
            {
                return BadRequest();
            }

            return Ok(list);
        }

        /// <summary>
        /// Get the information about bookings of a classroom fund by UserId
        /// </summary>
        /// <param name="userId">Specific user identifier</param>
        /// <param name="cancellationToken">Cancellation token</param>
        /// <returns>Paged bookings</returns>
        [Route("[action]/{userId}")]
        [HttpGet]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetBookingsByUser(int userId, CancellationToken cancellationToken)
        {
            var list = await _bookService.GetBookingsByUserAsync(userId, cancellationToken);

            if (list == null)
            {
                return BadRequest();
            }

            return Ok(list);
        }

    }
}
