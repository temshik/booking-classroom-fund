using CatalogService.BusinessLogic.Exceptions;

namespace CatalogService.Api.Extensions
{
    public static class ExceptionHandlerMiddlewareExtensions
    {
        public static void UseExceptionHandlerMiddleware(this IApplicationBuilder app, string environmentName)
        {
            app.UseMiddleware<ExceptionHandlerMiddleware>(environmentName);
        }
    }
}
