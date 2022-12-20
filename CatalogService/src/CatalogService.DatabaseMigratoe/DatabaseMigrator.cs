using CatalogService.DataAccess;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

public class DatabaseMigrator
{
    /// <summary>
    /// Method to initiating an application db context.
    /// </summary>
    /// <param name="app">Initiate a scope.</param>    
    public static async void MigrationInitialisation(IApplicationBuilder app)
    {
        using (var serviceScope = app.ApplicationServices.CreateScope())
        {
            var serviceProvider = serviceScope.ServiceProvider;
            try
            {
                var context = serviceProvider.GetService<CatalogContext>();
                context.Database.Migrate();
            }
            catch (Exception ex)
            {
                var logger = serviceProvider.GetRequiredService<ILogger<DatabaseMigrator>>();
                logger.LogError(ex, "An error occurred while seeding the database.");
            }

        }
    }
}
