using BookingService.DataAccess.Models;
using BookingService.DataAccess.Repositories;
using CatalogService.DataAccess.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace BookingService.DataAccess
{
    /// <summary>
    /// Static partial class for dependencies configuration.
    /// </summary>
    public static partial class DataAccessDependenciesConfiguration
    {
        /// <summary>
        /// Function to add services to the application.
        /// </summary>
        /// <param name="services">The service collection.</param>
        /// <returns>A <see cref="IServiceCollection"/></returns>
        public static IServiceCollection AddBookingServices(this IServiceCollection services, Action<DbContextOptionsBuilder> options)
        {
            services
                .AddDbContext<BookingContext>(options)
                .AddScoped(serviceProvider =>
            serviceProvider.GetRequiredService<BookingContext>().Set<Booking>());

            services.AddScoped<IBookingRepository, BookingRepository>();
            services.AddScoped<ISaveChangesRepository, SaveChangesRepository>();

            return services;
        }
    }
}
