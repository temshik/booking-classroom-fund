using IdentityService.DataAccess.Models;
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
        public static IServiceCollection AddRequiredServicesConfiguration(this IServiceCollection services)
        {
            services.AddScoped(serviceProvider => serviceProvider.GetRequiredService<IdentityContext>()
                .Set<UserRefreshToken>());
            services.AddScoped(serviceProvider => serviceProvider.GetRequiredService<IdentityContext>()
                .Set<UserClaim>());

            return services;
        }
    }
}
