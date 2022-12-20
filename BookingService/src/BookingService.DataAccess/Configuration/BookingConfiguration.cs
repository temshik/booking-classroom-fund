using BookingService.DataAccess.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BookingService.DataAccess.Configuration
{
    /// <summary>
    /// Booking configuration class is done using OnModelCreating method of the context class.
    /// </summary>
    public class BookingConfiguration : IEntityTypeConfiguration<Booking>
    {
        /// <summary>
        /// Changing the model configuration for relationships.
        /// </summary>
        /// <param name="builder">The model builder.</param>
        public void Configure(EntityTypeBuilder<Booking> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(i => i.Id)
                .IsRequired()
                .ValueGeneratedOnAdd();

            builder.Property(i => i.UserId)
                .IsRequired(true);
            builder.Property(i => i.WorkspaceId)
                .IsRequired(true);
            builder.Property(i => i.DayOfWeek)
                .IsRequired(true);
            builder.Property(i => i.StartBookingTime)
                .IsRequired(true);
            builder.Property(i => i.GroupNumber)
                   .IsRequired(true);

            builder.ToTable("Bookings");
        }
    }
}
