using IdentityService.DataAccess.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace IdentityService.DataAccess.Repository
{
    /// <summary>
    /// The user claim repository for CRUD operations
    /// </summary>
    public class UserClaimRepository : IUserClaimRepository
    {
        private readonly IdentityContext _context;
        private readonly DbSet<UserClaim> _claims;
        private readonly ILogger<UserClaimRepository> _logger;

        /// <summary>
        /// Initializes a new instance of <see cref="UserClaimRepository"/>
        /// </summary>
        /// <param name="context">The database context</param>
        /// <param name="logger">the logger</param>
        public UserClaimRepository(IdentityContext context, ILogger<UserClaimRepository> logger)
        {
            _context = context;
            _claims = _context.Set<UserClaim>();
            _logger = logger;
        }

        /// <summary>
        /// Function to update the claim of the user 
        /// </summary>
        /// <param name="user">the user for whom we want to add the claim</param>
        /// <param name="claims">The claims of the user </param>
        /// <returns>A <see cref="Task"/></returns>
        public void Update(List<UserClaim> claims)
        {
            _claims.UpdateRange(claims);

            _logger.LogInformation("Updating the userClaim");
        }

        /// <summary>
        /// Function to get the claim of the user
        /// </summary>
        /// <param name="user">The user that we want to get the claims</param>
        /// <returns>A Task that contains a List of <see cref="UserClaim"/></returns>
        public Task<List<UserClaim>> GetUserClaimsAsync(int id, CancellationToken cancellationToken)
        {
            return _claims
                .Where(userClaim => userClaim.Id == id)
                .AsNoTracking()
                .ToListAsync(cancellationToken);
        }
    }
}
