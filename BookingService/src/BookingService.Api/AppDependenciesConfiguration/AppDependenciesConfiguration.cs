namespace BookingService.Api.AppDependenciesConfiguration
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
                .AddServices(configuration)
                .AddConfigureJWT(builder)
                .ConfigureServices()
                .AddMappings();

            return builder;
        }
    }
}
