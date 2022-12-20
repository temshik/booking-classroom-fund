using IdentityService.DataAccess.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace IdentityService.DataAccess.Repository
{
    /// <summary>
    /// The user refresh repository for CRUD operations 
    /// </summary>
    public class RefreshTokenRepository : IRefreshTokenRepository
    {
        private readonly IdentityContext _context;
        private readonly DbSet<UserRefreshToken> _userRefreshToken;
        private readonly ILogger<RefreshTokenRepository> _logger;

        /// <summary>
        /// Initializes a new instance of <see cref="RefreshTokenRepository"/>
        /// </summary>
        /// <param name="context">The data base Context of the application</param>
        /// <param name="logger">The logger</param>
        public RefreshTokenRepository(IdentityContext context, ILogger<RefreshTokenRepository> logger)
        {
            _context = context;
            _logger = logger;
            _userRefreshToken = _context.UserRefreshTokens;
        }

        /// <summary>
        /// Function To add a user refresh token to the database
        /// </summary>
        /// <param name="token">The token that we want to add</param>
        /// <returns>A <see cref="Task"/></returns>
        public void Add(UserRefreshToken refreshToken)
        {
            _userRefreshToken.AddAsync(refreshToken);

            _logger.LogInformation("Added a user refresh Token");
        }

        /// <summary>
        /// Function to update the user refresh token 
        /// </summary>
        /// <param name="refreshToken">The user refresh token</param>
        /// <returns>A <see cref="Task"/></returns>
        public void Update(UserRefreshToken refreshToken)
        {
            _userRefreshToken.Update(refreshToken);

            _logger.LogInformation("Updated the refresh token");
        }

        /// <summary>
        /// Function To Get The refresh Token
        /// </summary>
        /// <param name="tokenRefresh">The refrsesh token that we want to get</param>
        /// <returns>A task that contains a <see cref="UserRefreshToken"/></returns>
        public Task<UserRefreshToken> GetSavedRefreshTokensAsync(string tokenRefresh, CancellationToken cancellationToken)
        {
            return _userRefreshToken.Include(i => i.User)
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.RefreshToken == tokenRefresh, cancellationToken);
        }
    }
}
