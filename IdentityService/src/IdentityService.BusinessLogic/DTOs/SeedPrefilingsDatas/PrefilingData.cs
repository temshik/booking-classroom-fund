using IdentityService.DataAccess.Models;
using Microsoft.AspNetCore.Identity;

namespace IdentityService.BusinessLogic.DTOs.SeedPrefilingsData
{
    public static class PrefilingData
    {
        /// <summary>
        /// List of Roles which can be taken by a User
        /// </summary>
        public static List<string> Roles = new List<string>
        {
            /// <summary>
            /// Has the highest priority for booking classrooms for (1-2 courses)
            /// </summary>
            "Dispacher",

            /// <summary>
            /// Responsible for the educational process, which has medium priority for booking classrooms for (3-4 courses)
            /// </summary>
            "Employee",

            /// <summary>
            /// Can leave a request to the dispatcher to change the time of the lesson
            /// </summary>
            "Teacher",
        };

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
            PasswordHash = new PasswordHasher<User>().HashPassword(UserAdmin,"QQQzzz_7584424"),
        };
    }
}
