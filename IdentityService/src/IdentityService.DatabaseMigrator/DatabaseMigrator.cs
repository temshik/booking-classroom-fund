using IdentityService.DataAccess;
using IdentityService.DataAccess.Models;
using IdentityService.DataAccess.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
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
                var userManager = serviceProvider.GetRequiredService<UserManager<User>>();
                var rolesManager = serviceProvider.GetRequiredService<RoleManager<Role>>();
                var context = serviceProvider.GetService<IdentityContext>();
                context.Database.Migrate();                
                await SeedDatabaseServices.SeedData(context, userManager, rolesManager);
            }
            catch (Exception ex)
            {
                var logger = serviceProvider.GetRequiredService<ILogger<DatabaseMigrator>>();
                logger.LogError(ex, "An error occurred while seeding the database.");
            }

        }
    }
}
