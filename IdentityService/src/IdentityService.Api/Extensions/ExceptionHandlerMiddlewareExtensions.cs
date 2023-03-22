using IdentityService.BusinessLogic.Exceptions;

namespace IdentityService.Api.Extensions
{
    public static class ExceptionHandlerMiddlewareExtensions
    {
        public static void UseExceptionHandlerMiddleware(this IApplicationBuilder app, string environmentName)
        {
            app.UseMiddleware<ExceptionHandlerMiddleware>(environmentName);
        }
    }
}
