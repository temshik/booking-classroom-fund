using CatalogService.DataAccess.Models;
using CatalogService.DataAccess.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace CatalogService.DataAccess
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
        public static IServiceCollection ConfigureServicesApplication(this IServiceCollection services, Action<DbContextOptionsBuilder> options)
        {
            services
                .AddDbContext<CatalogContext>(options)
                .AddScoped(serviceProvider =>
            serviceProvider.GetRequiredService<CatalogContext>().Set<Category>())
                .AddScoped(serviceProvider =>
            serviceProvider.GetRequiredService<CatalogContext>().Set<Workspace>());

            services.AddScoped<ICategoryRepository, CategoryRepository>();
            services.AddScoped<IWorkspaceRepository, WorkspaceRepository>();
            services.AddScoped<ISaveChangesRepository, SaveChangesRepository>();

            return services;
        }
    }
}
