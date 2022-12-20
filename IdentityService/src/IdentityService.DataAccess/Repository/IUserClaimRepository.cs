using IdentityService.DataAccess.Models;

namespace IdentityService.DataAccess.Repository
{
    /// <summary>
    /// Interface fot the user claim 
    /// </summary>
    public interface IUserClaimRepository
    {
        /// <summary>
        /// Function to get the claims of the user
        /// </summary>
        /// <param name="user">The user for whom we want to get the claims</param>
        /// <returns>A list of object <see cref="UserClaim"/> </returns>
        Task<List<UserClaim>> GetUserClaimsAsync(int id, CancellationToken cancellationToken);

        /// <summary>
        /// Function to update the claims of the user
        /// </summary>
        /// <param name="claims">The claims that we want to update</param>
        /// <returns>Return a <see cref="Task"/></returns>
        void Update(List<UserClaim> claims);
    }
}
