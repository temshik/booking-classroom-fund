using IdentityService.BusinessLogic.DTOs.SeedPrefilingsData;
using IdentityService.DataAccess.Identity.Stores;
using IdentityService.DataAccess.Models;
using Microsoft.AspNetCore.Identity;

namespace IdentityService.DataAccess.Services
{
    /// <summary>
    /// Static class to set up database and call migrations file
    /// that injected into program class.
    /// </summary>
    public static class SeedDatabaseServices 
    {
        /// <summary>
        /// Method to initiating an application db context.
        /// </summary>
        /// <param name="app">Initiate a scope.</param>
        public static async Task SeedData(IdentityContext context, UserManager<User> userManager, RoleManager<Role> roleManager)
        {
            foreach (var item in PrefilingData.Roles)
            {
                if (!roleManager.Roles.Any(r => r.Name == item))
                {
                    await roleManager.CreateAsync(new Role(item));
                }
            }

            var user = PrefilingData.UserAdmin;

            if (!userManager.Users.Any(u => u.UserName == user.UserName))
            {               
                var result = await userManager.CreateAsync(user);
                await context.SaveChangesAsync();
                var res = await userManager.AddToRoleAsync(user, PrefilingData.Roles[0]);
            }           

            await context.SaveChangesAsync();           
        }
    }
}
