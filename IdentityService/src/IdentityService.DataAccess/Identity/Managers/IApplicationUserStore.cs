using IdentityService.DataAccess.Models;
using Microsoft.AspNetCore.Identity;

namespace IdentityService.DataAccess.Identity.Managers
{
    public interface IApplicationUserStore : IUserStore<User>
    {
    }
}
