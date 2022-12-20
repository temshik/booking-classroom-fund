using Microsoft.AspNetCore.Identity;

namespace IdentityService.BusinessLogic.DTOs
{
    /// <summary>
    /// Data transfer object for Token for Role
    /// </summary>
    public class RoleDTO : IdentityRole<int>
    {
        /// <summary>
        /// The name of the user role
        /// </summary>
        public string Name { get; set; }
    }
}
