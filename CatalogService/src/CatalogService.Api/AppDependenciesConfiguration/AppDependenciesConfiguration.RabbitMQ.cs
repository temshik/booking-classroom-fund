using RabbitMQ.Producer.AsyncDataService;

namespace CatalogService.Api.AppDependenciesConfiguration
{
    /// <summary>
    /// Static partial class for dependencies configuration.
    /// </summary>
    public static partial class AppDependenciesConfiguration
    {
        /// <summary>
        /// Configure MessageBus in order to connect with RabbitMQ
        /// </summary>
        /// <param name="services">The service collection.</param>
        /// <param name="configuration">The configuration.</param>
        /// <returns>A <see cref="IServiceCollection"/></returns>
        public static IServiceCollection AddMessageBusWithRabbitMq(this IServiceCollection services)
        {
            services.AddSingleton<IMessageProducer, MessageProducer>();

            return services;
        }
    }
}
