using CatalogService.Api.Profiles;
using CatalogService.Api.Requests;
using CatalogService.Api.Validators;
using CatalogService.BusinessLogic.Services;
using CatalogService.BusinessLogic.Services.SyncDataService.Http;
using CatalogService.DataAccess;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace CatalogService.Api.AppDependenciesConfiguration
{
    /// <summary>
    /// Static partial class for dependencies configuration.
    /// </summary>
    public static partial class AppDependenciesConfiguration
    {
        /// <summary>
        /// Adding an CatalogContext to interact with the account database.
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

            services.ConfigureServicesApplication(options =>
                options.UseSqlServer(connectionString));

            return services;
        }

        /// <summary>
        /// Function to add services to the application service.
        /// </summary>
        /// <param name="services">The service collection.</param>
        /// <returns>A <see cref="IServiceCollection"/></returns>
        public static IServiceCollection ConfigureService(this IServiceCollection services)
        {
            services               
                .AddScoped<IWorkspaceService, WorkspaceService>()
                .AddScoped<ICategoryService, CategoryService>();

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
                .AddAutoMapper(typeof(WorkspaceProfile), typeof(CategoryProfile));

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
                .AddScoped<IValidator<WorkspaceRequestCreate>, WorkspaceRequestCreateValidator>()
                .AddScoped<IValidator<WorkspaceRequestUpdate>, WorkspaceRequestUpdateValidator>()
                .AddScoped<IValidator<CategoryRequestCreate>, CategoryRequestCreateValidator>()
                .AddScoped<IValidator<CategoryRequestUpdate>, CategoryRequestUpdateValidator>();

            return services;
        }
    }
}
