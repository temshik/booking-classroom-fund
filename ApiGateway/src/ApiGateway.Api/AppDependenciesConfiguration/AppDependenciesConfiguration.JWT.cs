using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace ApiGateway.Api.AppDependenciesConfiguration
{
    /// <summary>
    /// Static partial class for dependencies configuration.
    /// </summary>
    public static partial class AppDependenciesConfiguration
    {
        /// <summary>
        /// Adding JWT configuration.
        /// </summary>
        /// <param name="services">The service collection.</param>
        /// <returns>The service collection.</returns>
        public static IServiceCollection AddConfigureJWT(this IServiceCollection services, WebApplicationBuilder builder)
        {
            var authenticationProviderKey = "TestKey";

            var jwtConfig = builder.Configuration.GetSection("JwtSettings");
            var secretKey = jwtConfig["secretKey"];

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddJwtBearer(authenticationProviderKey, options =>
                {
                    options.RequireHttpsMetadata = false;
                    options.SaveToken = true;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey)),
                        ValidateIssuerSigningKey = true,
                        ClockSkew = TimeSpan.Zero,
                        RequireExpirationTime = false,
                        ValidIssuer = jwtConfig["Issuer"],
                        ValidAudience = jwtConfig["Audience"],
                    };
                });

            return services;
        }
    }
}
