using Serilog;

namespace IdentityService.Api.AppDependenciesConfiguration
{
    /// <summary>
    /// Static partial class for dependencies configuration.
    /// </summary>
    public static partial class AppDependenciesConfiguration
    {
        /// <summary>
        /// Add logger configuration to the application
        /// </summary>
        /// <param name="builder">The web application builder</param>
        /// <param name="config">The configuraiton</param>
        /// <returns>The webapplication builder</returns>
        public static WebApplicationBuilder AddLogger(this WebApplicationBuilder builder, IConfiguration config)
        {
            builder.Host.UseSerilog((context, services, config) => config                          
                .Enrich.FromLogContext()
                .Enrich.WithMachineName()
                .ReadFrom.Configuration(context.Configuration)
                .ReadFrom.Services(services)
                .WriteTo.Console());            

            return builder;
        }       
    }
}
