using IdentityService.DataAccess.Models;

namespace IdentityService.DataAccess.Repository
{
    /// <summary>
    /// Interface for user refresh
    /// </summary>
    public interface IRefreshTokenRepository
    {
        /// <summary>
        /// Function to add the refresh token to the database
        /// </summary>
        /// <param name="token">the user refresh token that we want to save</param>
        /// <returns>A <see cref="Task"/></returns>
        void Add(UserRefreshToken token);

        /// <summary>
        /// Function to Delete a refresh token from the database
        /// </summary>
        /// <param name="refreshToken">the user refresh token</param>
        void Update(UserRefreshToken refreshToken);

        /// <summary>
        /// Function to get a refresh token that exists in the database
        /// </summary>
        /// <param name="tokenRefresh">The user refresh token that we want to get</param>
        /// <returns>An object <see cref="UserRefreshToken"/></returns>
        Task<UserRefreshToken> GetSavedRefreshTokensAsync(string tokenRefresh, CancellationToken cancellationToken);
    }
}
