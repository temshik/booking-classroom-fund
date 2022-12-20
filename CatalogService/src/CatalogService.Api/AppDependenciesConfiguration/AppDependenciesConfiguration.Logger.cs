using Serilog;
using Serilog.Events;

namespace CatalogService.Api.AppDependenciesConfiguration
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
                .ReadFrom.Configuration(context.Configuration)
                .ReadFrom.Services(services)
                .Enrich.FromLogContext());

            return builder;
        }

        /// <summary>
        /// Adding loger configuration for serilog setup.
        /// </summary>
        /// <param name="services">The service collection.</param>
        /// <param name="configuration">The loger configuration.</param>
        /// <returns></returns>
        public static IServiceCollection AddSerilogServices(this IServiceCollection services, LoggerConfiguration configuration)
        {
            Log.Logger = configuration.CreateLogger();
            AppDomain.CurrentDomain.ProcessExit += (s, e) => Log.CloseAndFlush();

            return services.AddSingleton(Log.Logger);
        }

        /// <summary>
        /// Adding logger configuration for write to settings.
        /// </summary>
        /// <param name="services">The service collection.</param>
        /// <param name="configuration">The configuration.</param>
        /// <returns></returns>
        public static IServiceCollection AddSerilogServices(this IServiceCollection services, IConfiguration configuration)
        {
            return services.AddSerilogServices(
                new LoggerConfiguration()
                    .MinimumLevel.Verbose()
                    .WriteTo.Seq(configuration.GetSection("Serilog")["serverUrl"])
                    .WriteTo.Logger(l => l.Filter.ByIncludingOnly(e => e.Level == LogEventLevel.Information).WriteTo.File(@"Logs\Info-{Date}.log", rollingInterval: RollingInterval.Day))
                    .WriteTo.Logger(l => l.Filter.ByIncludingOnly(e => e.Level == LogEventLevel.Debug).WriteTo.File(@"Logs\Debug-{Date}.log", rollingInterval: RollingInterval.Day))
                    .WriteTo.Logger(l => l.Filter.ByIncludingOnly(e => e.Level == LogEventLevel.Warning).WriteTo.File(@"Logs\Warning-{Date}.log", rollingInterval: RollingInterval.Day))
                    .WriteTo.Logger(l => l.Filter.ByIncludingOnly(e => e.Level == LogEventLevel.Error).WriteTo.File(@"Logs\Error-{Date}.log", rollingInterval: RollingInterval.Day))
                    .WriteTo.File(@"Logs\Verbose-{Date}.log", rollingInterval: RollingInterval.Day));
        }
    }
}
