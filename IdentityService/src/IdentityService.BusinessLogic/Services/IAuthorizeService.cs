using IdentityService.BusinessLogic.DTOs;
using IdentityService.DataAccess.Models;

namespace IdentityService.BusinessLogic.Services
{
    /// <summary>
    /// Interface for Autorization operations
    /// </summary>
    public interface IAuthorizeService
    {
        /// <summary>
        /// The user gets token after authorization
        /// </summary>
        /// <param name="user">The user that wants to get authorization</param>
        /// <param name="password">The password of the user</param>
        /// <returns>Token</returns>
        Task<TokenDTO> AuthorizeAsync(string email, string password, bool rememberMe, CancellationToken cancellationToken);

        /// <summary>
        /// Function to refresh a token that has expired
        /// </summary>
        /// <param name="token">The the token that has expired</param>
        /// <returns>A Task that contains <see cref="TokenDto"/></returns>
        Task<TokenDTO> RefreshTokenAsync(string token, CancellationToken cancellationToken);

        /// <summary>
        /// Function to get the claims of the user
        /// </summary>
        /// <param name="id">The id of the user</param>
        /// <returns>A List of <see cref="UserClaim"/></returns>
        Task<List<UserClaim>> GetUserClaimsAsync(int id, CancellationToken cancellationToken);
    }
}
