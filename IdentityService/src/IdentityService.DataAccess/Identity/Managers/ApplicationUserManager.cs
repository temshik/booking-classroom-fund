using IdentityService.DataAccess.Identity.Stores;
using IdentityService.DataAccess.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace IdentityService.DataAccess.Identity.Managers
{
    public class ApplicationUserManager : UserManager<User>
    {
        private readonly ApplicationUserStore _store;

        public ApplicationUserManager(ApplicationUserStore store, IOptions<IdentityOptions> optionsAccessor,
        IPasswordHasher<User> passwordHasher, IEnumerable<IUserValidator<User>> userValidators,
        IEnumerable<IPasswordValidator<User>> passwordValidators, ILookupNormalizer keyNormalizer,
        IdentityErrorDescriber errors, IServiceProvider service, ILogger<UserManager<User>> logger)
        : base(store, optionsAccessor, passwordHasher, userValidators, passwordValidators, keyNormalizer, errors, service, logger)
        {
            _store = store;
        }

        public virtual async Task<IdentityResult> AddToRoleByRoleIdAsync(User user, int roleId)
        {
            ThrowIfDisposed();

            if (user == null)
                throw new ArgumentNullException(nameof(user));

            _store.Context.Set<IdentityUserRole<int>>().Add(new IdentityUserRole<int> { RoleId = roleId, UserId = user.Id });

            return await UpdateUserAsync(user);
        }

        public async Task<bool> IsInRoleByIdAsync(User user, string roleId, CancellationToken cancellationToken = default(CancellationToken))
        {
            cancellationToken.ThrowIfCancellationRequested();
            ThrowIfDisposed();

            if (user == null)
                throw new ArgumentNullException(nameof(user));

            if (string.IsNullOrWhiteSpace(roleId))
                throw new ArgumentNullException(nameof(roleId));

            var role = await _store.Context.Set<IdentityRole>().FindAsync(roleId);
            if (role == null)
                return false;

            var userRole = await _store.Context.Set<IdentityUserRole<int>>().FindAsync(new object[] { user.Id, roleId }, cancellationToken);
            return userRole != null;
        }
    }
}
