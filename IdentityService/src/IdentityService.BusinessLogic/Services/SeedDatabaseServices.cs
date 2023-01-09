using IdentityService.BusinessLogic.DTOs.SeedPrefilingsData;
using IdentityService.BusinessLogic.DTOs.SeedPrefilingsDatas;
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
            foreach (var item in Enum.GetValues(typeof(PrefilingRoleData)))
            {
                if (!roleManager.Roles.Any(r => r.Name == item.ToString()))
                {
                    await roleManager.CreateAsync(new Role(item.ToString()));
                }
            }

            var user = PrefilingUserData.UserAdmin;

            if (!userManager.Users.Any(u => u.UserName == user.UserName))
            {
                var result = await userManager.CreateAsync(user);
                await context.SaveChangesAsync();
                var res = await userManager.AddToRoleAsync(user, PrefilingRoleData.Dispacher.ToString());
            }

            await context.SaveChangesAsync();
        }
    }
}
