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
        public static IServiceCollection DataAccessConfiguration(this IServiceCollection services)
        {
            services.AddRequiredServicesConfiguration()
                .AddIdentityServicesConfiguration();

            return services;
        }
    }
}
