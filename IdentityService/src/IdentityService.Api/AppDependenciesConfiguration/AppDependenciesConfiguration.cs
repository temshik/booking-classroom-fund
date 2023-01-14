using FluentValidation;
using FluentValidation.AspNetCore;
using IdentityService.Api.Validators;
using IdentityService.DataAccess;
using IdentityService.DataAccess.DataAccessDependenciesConfiguration;

namespace IdentityService.Api.AppDependenciesConfiguration
{
    /// <summary>
    /// Static partial class for dependencies configuration.
    /// </summary>
    public static partial class AppDependenciesConfiguration
    {
        /// <summary>
        /// Adds the infrastructure servicies to configure the application.
        /// </summary>
        /// <param name="builder">The application builder.</param>
        /// <returns>Application builder.</returns>
        public static WebApplicationBuilder ConfigureDependencies(this WebApplicationBuilder builder)
        {
            var configuration = builder.Configuration;

            builder.Services
                .DataAccessConfiguration()
                .AddServices(configuration)
                .ConfigureServicesApplication()
                .ConfigureValidationApplication()
                .AddMappings()
                .AddConfigureSwagger()
                .AddConfigureJWT(builder)
                .AddValidatorsFromAssemblyContaining<UserRequestCreateValidator>()
                .AddFluentValidationAutoValidation()
                .AddHealthChecks()
                .AddDbContextCheck<IdentityContext>();

            builder.AddLogger(configuration);

            return builder;
        }
    }
}
