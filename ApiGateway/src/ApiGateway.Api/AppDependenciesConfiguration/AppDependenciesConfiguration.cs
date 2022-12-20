using Ocelot.DependencyInjection;

namespace ApiGateway.AppDependenciesConfiguration
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
            var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

            builder.Services.AddOcelot(configuration);
            //configuration.AddJsonFile($"ocelot.{builder.Environment.EnvironmentName}.json", true, true);
            configuration.SetBasePath(builder.Environment.ContentRootPath);
            builder.Host.ConfigureAppConfiguration(config => config.AddJsonFile($"ocelot.{env}.json", true, true));

            return builder;
        }
    }
}
