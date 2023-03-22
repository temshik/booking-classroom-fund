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
            builder.Services.AddCors(options => options.AddPolicy("CorsPolicy", builder =>
                builder.WithOrigins("http://localhost:3000", "http://localhost", "http://anydeals.norwayeast.cloudapp.azure.com", "http://anydeals.norwayeast.cloudapp.azure.com:5000")
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials()));

            var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
            configuration.SetBasePath(builder.Environment.ContentRootPath);
            builder.Host.ConfigureAppConfiguration(config => config.AddJsonFile($"ocelot.{env}.json", true, true));

            return builder;
        }
    }
}
