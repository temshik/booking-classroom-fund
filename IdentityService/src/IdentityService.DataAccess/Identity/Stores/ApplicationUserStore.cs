using IdentityService.DataAccess.Identity.Managers;
using IdentityService.DataAccess.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace IdentityService.DataAccess.Identity.Stores
{
    public class ApplicationUserStore : UserStore<User, Role, IdentityContext, int, UserClaim,
        IdentityUserRole<int>,
        IdentityUserLogin<int>,
        IdentityUserToken<int>,
        IdentityRoleClaim<int>>, IApplicationUserStore
    {
        public ApplicationUserStore(IdentityContext context) : base(context)
        {

        }
    }
}
