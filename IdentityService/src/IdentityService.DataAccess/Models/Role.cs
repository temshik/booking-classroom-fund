using Microsoft.AspNetCore.Identity;

namespace IdentityService.DataAccess.Models
{
    /// <summary>
    /// Custom role data class is being used, update the class to inherit from IdentityRole<TKey>
    /// </summary>
    public class Role : IdentityRole<int>
    {
        /// <summary>
        /// Constructor To initialise a new instance of role  
        /// </summary>
        /// <param name="name">The name of the role</param>
        public Role(string name) : base(name)
        {

        }

        /// <summary>
        /// Navigation property for user
        /// </summary>
        public virtual ICollection<User> Users { get; set; }
    }
}
