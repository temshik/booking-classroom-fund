using IdentityService.DataAccess.Models;
using Microsoft.AspNetCore.Identity;

namespace IdentityService.BusinessLogic.DTOs.SeedPrefilingsData
{
    public static class PrefilingUserData
    {
        public static User UserAdmin { get; } = new()
        {
            FirstName = "Artem",
            LastName = "ADMIN",
            Email = "hotko.ar@mail.ru",
            NormalizedEmail = "HOTKO.AR@MAIL.RU",
            UserName = "Artem",
            NormalizedUserName = "ARTEM",
            PhoneNumber = "+111111111112",
            EmailConfirmed = true,
            PhoneNumberConfirmed = true,
            SecurityStamp = Guid.NewGuid().ToString("D"),
            PasswordHash = new PasswordHasher<User>().HashPassword(UserAdmin, "QQQzzz_7584424"),
        };
    }
}
