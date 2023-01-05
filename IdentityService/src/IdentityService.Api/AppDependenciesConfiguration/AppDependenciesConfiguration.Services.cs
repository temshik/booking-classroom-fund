using FluentValidation;
using IdentityService.Api.Profiles;
using IdentityService.Api.Requests;
using IdentityService.Api.Validators;
using IdentityService.BusinessLogic.Services;
using IdentityService.DataAccess;
using Microsoft.EntityFrameworkCore;

namespace IdentityService.Api.AppDependenciesConfiguration
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

            var connectionString = $"Server={server},{port}; Initial Catalog={database}; User ID={user}; Password={password}";

            services.AddDbContextPool<IdentityContext>(options =>
                options.UseSqlServer(connectionString));

            return services;
        }

        /// <summary>
        /// Function to add services to the application service.
        /// </summary>
        /// <param name="services">The service collection.</param>
        /// <returns>A <see cref="IServiceCollection"/></returns>
        public static IServiceCollection ConfigureServicesApplication(this IServiceCollection services)
        {
            services
                .AddScoped<IUserService, UserService>()
                .AddScoped<IAuthorizeService, AuthorizeService>();

            return services;
        }

        /// <summary>
        /// Function to add automapper to the application service.
        /// </summary>
        /// <param name="services">The service collection.</param>
        /// <returns>A <see cref="IServiceCollection"/></returns>
        public static IServiceCollection AddMappings(this IServiceCollection services)
        {
            services
                .AddAutoMapper(typeof(UserProfile), typeof(ClaimProfile));

            return services;
        }

        /// <summary>
        /// Function to add validation to the application service.
        /// </summary>
        /// <param name="services">The service collection.</param>
        /// <returns>A <see cref="IServiceCollection"/></returns>
        public static IServiceCollection ConfigureValidationApplication(this IServiceCollection services)
        {
            services
                .AddScoped<IValidator<UserRequestCreate>, UserRequestCreateValidator>()
                .AddScoped<IValidator<UserRequestUpdate>, UserRequestUpdateValidator>()
                .AddScoped<IValidator<UserRequestLogin>, UserRequestLoginValidator>();

            return services;
        }
    }
}
