using Microsoft.AspNetCore.Identity;

namespace IdentityService.DataAccess.Models
{
    /// <summary>
    /// Custom user data class is being used, update the class to inherit from IdentityUser<TKey>
    /// </summary>
    public class User : IdentityUser<int>
    {
        /// <summary>
        /// User first name
        /// </summary>
        public string FirstName { get; set; }

        /// <summary>
        /// User surname
        /// </summary>
        public string LastName { get; set; }

        /// <summary>
        /// First user registration date
        /// </summary>
        public DateTimeOffset RegistrationDate { get; set; }

        /// <summary>
        /// Navigation property that allows associated UserClaims
        /// </summary>
        public virtual ICollection<UserClaim> Claims { get; set; }

        /// <summary>
        /// Navigation property that allows associated UserTokens
        /// </summary>
        public virtual List<UserRefreshToken> Tokens { get; set; }
    }
}
