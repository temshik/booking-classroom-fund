using IdentityService.DataAccess.Models;
using IdentityService.DataAccess.Repository;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;

namespace IdentityService.DataAccess.DataAccessDependenciesConfiguration
{
    /// <summary>
    /// Data Access Dependency Injection Extension
    /// </summary>
    public static partial class DataAccessDependenciesConfiguration
    {
        /// <summary>
        /// Adding Idenity services
        /// </summary>
        /// <param name="services">The service collection</param>
        public static IServiceCollection AddIdentityServicesConfiguration(this IServiceCollection services)
        {
            services.AddIdentity<User, Role>()
            .AddEntityFrameworkStores<IdentityContext>()
            .AddDefaultTokenProviders();

            services.AddScoped<IUserClaimRepository, UserClaimRepository>();
            services.AddScoped<IRefreshTokenRepository, RefreshTokenRepository>();
            services.AddScoped<ISaveChangesRepository, SaveChangesRepository>();

            return services;
        }
    }
}
