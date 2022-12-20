using Microsoft.AspNetCore.Identity;

namespace IdentityService.DataAccess.Models
{
    /// <summary>
    /// Navigation property, which is needed 
    /// to navigate the many-to-many relationship from Users to Claims
    /// </summary>
    public class UserClaim : IdentityUserClaim<int>
    {
        /// <summary>
        /// Each User can have many UserClaims
        /// </summary>
        public virtual User User { get; set; }
    }
}
