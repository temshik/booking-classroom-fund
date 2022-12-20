using IdentityService.DataAccess.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace IdentityService.DataAccess.Identity.Stores
{
    public class ApplicationRoleStore : RoleStore<Role, IdentityContext, int>
    {
        public ApplicationRoleStore(IdentityContext context) : base(context)
        {
        }
    }
}
