using CatalogService.Api.Validators;
using CatalogService.BusinessLogic.Services.SyncDataService.Http;
using CatalogService.DataAccess;
using FluentValidation;

namespace CatalogService.Api.AppDependenciesConfiguration
{
    public static partial class AppDependenciesConfiguration
    {
        /// <summary>
        /// Function to configure the service of the web application
        /// </summary>
        /// <param name="builder"></param>
        /// <returns></returns>
        public static WebApplicationBuilder ConfigureServices(this WebApplicationBuilder builder)
        {
            var configuration = builder.Configuration;

            builder.Services
                .AddServices(configuration)
                .AddSerilogServices(configuration)
                .ConfigureValidationApplication()
                .AddMessageBusWithRabbitMq()
                .ConfigureValidationApplication()
                .AddMappings()
                .ConfigureService()
                .AddValidatorsFromAssemblyContaining<CategoryRequestCreateValidator>()
                .AddHealthChecks()
                    .AddDbContextCheck<CatalogContext>();

            builder.Services.AddHttpClient<IBookingDataClient, HttpBookingDataClient>();

            builder.AddLogger(configuration);

            return builder;
        }
    }
}
