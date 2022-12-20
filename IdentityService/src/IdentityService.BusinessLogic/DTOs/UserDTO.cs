using IdentityService.DataAccess.Models;
using Microsoft.AspNetCore.Identity;

namespace IdentityService.BusinessLogic.DTOs
{
    /// <summary>
    /// Data transfer object for User
    /// </summary>
    public class UserDTO : IdentityUser<int>
    {
        /// <summary>
        /// The first Name of the user 
        /// </summary>
        public string FirstName { get; set; }

        /// <summary>
        /// The last name of the user
        /// </summary>
        public string LastName { get; set; }

        /// <summary>
        /// the registration date of the user
        /// </summary>
        public DateTimeOffset RegistrationDate { get; set; }

        /// <summary>
        /// The claims of the user
        /// </summary>
        public virtual ICollection<UserClaim> Claims { get; set; }
    }
}
