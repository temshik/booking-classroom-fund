using BookingService.Api.Profiles;
using BookingService.BusinessLogic.Services;
using BookingService.BusinessLogic.Services.AsyncDataServices;
using BookingService.BusinessLogic.Services.EventProcessing;
using BookingService.DataAccess;
using Microsoft.EntityFrameworkCore;

namespace BookingService.Api.AppDependenciesConfiguration
{
    /// <summary>
    /// Static partial class for dependencies configuration.
    /// </summary>
    public static partial class AppDependenciesConfiguration
    {
        /// <summary>
        /// Adding an IdentityContext to interact with the account database.
        /// </summary>
        /// <param name="services">The service collection.</param>
        /// <param name="configuration">The configuration.</param>
        /// <returns>A <see cref="IServiceCollection"/></returns>
        public static IServiceCollection AddServices(this IServiceCollection services, IConfiguration configuration)
        {
            var server = configuration["DatabaseServer"] ?? "";
            var port = configuration["DatabasePort"] ?? "";
            var user = configuration["DatabaseUser"] ?? "";
            var password = configuration["DatabasePassword"] ?? "";
            var database = configuration["DatabaseName"] ?? "";

            var connectionString = $"Server={server},{port}; Initial Catalog={database}; User ID={user}; Password={password}; TrustServerCertificate = True;";

            services.AddBookingServices(options =>
                options.UseSqlServer(connectionString));

            return services;
        }

        /// <summary>
        /// Function to add services to the application service.
        /// </summary>
        /// <param name="services">The service collection.</param>
        /// <returns>A <see cref="IServiceCollection"/></returns>
        public static IServiceCollection ConfigureServices(this IServiceCollection services)
        {
            services
                .AddScoped<IBookService, BookService>()
                .AddHostedService<MessageSubscriber>()
                .AddSingleton<IEventProcessor, EventProcessor>();

            return services;
        }

        /// <summary>
        /// Function to add automapper to the application service.
        /// </summary>
        /// <param name="services">The service collection.</param>
        /// <returns>A <see cref="IServiceCollection"/></returns>
        public static IServiceCollection AddMappings(this IServiceCollection services)
        {
            services.AddAutoMapper(typeof(BookingProfile));

            return services;
        }
    }
}
