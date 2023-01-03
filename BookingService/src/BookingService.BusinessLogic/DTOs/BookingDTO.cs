namespace BookingService.BusinessLogic.DTOs
{
    /// <summary>
    /// Data transfer object fot Booking.
    /// </summary>
    public class BookingDTO
    {
        /// <summary>
        /// The id of the booking.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// The Id of the user
        /// </summary>
        public int UserId { get; set; }

        /// <summary>
        /// The Id of the workspace
        /// </summary>
        public int WorkspaceId { get; set; }

        /// <summary>
        /// Falg for the workspace umder renovation or not, any other problems with the audience
        /// </summary>
        public bool IsWorkspaceAvailable { get; set; }

        /// <summary>
        /// Day of week when the booking appears
        /// </summary>
        public DayOfWeek DayOfWeek { get; set; }

        /// <summary>
        /// Time of the booking start
        /// </summary>
        public DateTimeOffset StartBookingTime { get; set; }

        /// <summary>
        /// The number of the group
        /// </summary>
        public int GroupNumber { get; set; }
    }
}
