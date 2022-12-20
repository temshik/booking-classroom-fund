using Plain.RabbitMQ;
using RabbitMQ.Client;

namespace CatalogService.Api.AppDependenciesConfiguration
{
    /// <summary>
    /// Static partial class for dependencies configuration.
    /// </summary>
    public static partial class AppDependenciesConfiguration
    {
        /// <summary>
        /// Configure MassTransit in order to connect with RabbitMQ
        /// </summary>
        /// <param name="services">The service collection.</param>
        /// <param name="configuration">The configuration.</param>
        /// <returns>A <see cref="IServiceCollection"/></returns>
        public static IServiceCollection AddMassTransitWithRabbitMq(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddSingleton<IConnectionProvider>(new ConnectionProvider("amqp://guest:guest@localhost:5672"));
            services.AddScoped<ISubscriber>(x => new Subscriber(x.GetService<IConnectionProvider>(),
                "catalog_exchange",
                "catalog_queue",
                "catalog.*",
                ExchangeType.Topic));

            return services;
        }
    }
}
