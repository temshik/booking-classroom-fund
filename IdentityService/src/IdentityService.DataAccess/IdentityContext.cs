using IdentityService.DataAccess.Configurations;
using IdentityService.DataAccess.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace IdentityService.DataAccess
{
    /// <summary>
    /// Identity database context used to configure the model
    /// Supplying entity and key types for the generic type parameters.
    /// </summary>
    public class IdentityContext : IdentityDbContext<User, Role, int, UserClaim,
            IdentityUserRole<int>,
            IdentityUserLogin<int>,
            IdentityRoleClaim<int>,
            IdentityUserToken<int>>
    {
        /// <summary>
        /// Adding a Data base set for the refresh token
        /// </summary>
        public virtual DbSet<UserRefreshToken> UserRefreshTokens { get; set; }

        /// <summary>Initialzez a new instance of the <see cref="IdentityContext" /> class.</summary>
        /// <param name="options">The database context options.</param>
        public IdentityContext(DbContextOptions<IdentityContext> options)
            : base(options)
        {

        }

        /// <summary>
        /// Overriding method to modify the mapping of these types.
        /// </summary>
        /// <param name="modelBuilder">The model builder</param>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new UserConfiguration());
            modelBuilder.ApplyConfiguration(new RoleConfiguration());
            modelBuilder.ApplyConfiguration(new TokenConfiguration());
        }
    }
}
