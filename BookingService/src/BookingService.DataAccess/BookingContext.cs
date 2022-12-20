using BookingService.DataAccess.Configuration;
using BookingService.DataAccess.Models;
using Microsoft.EntityFrameworkCore;

namespace BookingService.DataAccess
{
    /// <summary>
    /// Booking database context used to configure the model.
    /// </summary>
    public class BookingContext : DbContext
    {
        /// <summary>
        /// Adding a Database set for the bookings.
        /// </summary>
        public DbSet<Booking> Bookings { get; set; }

        /// <summary>
        ///  Initializes a new instance of the <see cref="BookingContext"/> class.
        /// </summary>
        /// <param name="options">The database context optrions.</param>
        public BookingContext(DbContextOptions<BookingContext> options) : base(options)
        {

        }

        /// <summary>
        /// Method to modify the mapping of these types.
        /// </summary>
        /// <param name="modelBuilder">The model builder.</param>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {            
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(BookingContext).Assembly);
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new BookingConfiguration());
            
        }
    }
}
