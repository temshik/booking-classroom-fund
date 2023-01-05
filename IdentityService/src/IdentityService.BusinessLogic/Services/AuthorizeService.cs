using IdentityService.BusinessLogic.DTOs;
using IdentityService.BusinessLogic.Exceptions;
using IdentityService.DataAccess.Models;
using IdentityService.DataAccess.Repository;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace IdentityService.BusinessLogic.Services
{
    /// <summary>
    /// Serice for base authorization operations
    /// </summary>
    public class AuthorizeService : IAuthorizeService
    {
        private readonly IConfiguration _settings;
        private readonly UserManager<User> _userManager;
        private readonly IRefreshTokenRepository _repository;
        private readonly IUserClaimRepository _userClaimRepository;
        private readonly ILogger<AuthorizeService> _logger;
        private readonly ISaveChangesRepository _saveChangesRepository;

        /// <summary>
        /// Initializes a new instance of <see cref="AuthorizeService"/>
        /// </summary>
        /// <param name="userManager"></param>
        public AuthorizeService(IConfiguration settings,
            UserManager<User> userManager,
            IRefreshTokenRepository refreshRepository,
            IUserClaimRepository claimRepository,
            ILogger<AuthorizeService> logger,
            ISaveChangesRepository saveChangesRepository)
        {
            _settings = settings;
            _userManager = userManager;
            _repository = refreshRepository;
            _userClaimRepository = claimRepository;
            _logger = logger;
            _saveChangesRepository = saveChangesRepository;
        }

        /// <summary>
        /// The user gets token after authorization
        /// </summary>
        /// <param name="user">The user that we want to authorize</param>
        /// <param name="password">The password of the user</param>
        /// <returns>Token</returns>
        public async Task<TokenDTO> AuthorizeAsync(string email, string password, CancellationToken cancellationToken)
        {
            var user = await ValidateUserAsync(email, password);
            var tokenHandler = new JwtSecurityTokenHandler();
            var refreshToken = GenerateRefreshToken();
            var securityTokenDescriptor  = await GenerateTokenAsync(user);
            var token = tokenHandler.CreateToken(securityTokenDescriptor);
            var JwtToken = tokenHandler.WriteToken(token);
                  
            _repository.Add(new UserRefreshToken
            {
                CreationDate = DateTimeOffset.Now,
                LifeRefreshTokenInMinutes = Convert.ToInt32(_settings.GetSection("JwtSettings")["LifeTimeRefresh"]),
                RefreshToken = refreshToken,
                UserId = user.Id
            });

            await _saveChangesRepository.SaveChangesAsync(cancellationToken);
            _logger.LogInformation($"Saving the changes to the databse");

            return new TokenDTO
            {
                RefreshToken = refreshToken,
                TokenLifeTimeInMinutes = Convert.ToInt32(_settings.GetSection("JwtSettings")["LifeTimeRefresh"]),
                AccessToken = JwtToken,
            };            
        }

        /// <summary>
        /// Function To generate the token from the claims of the user
        /// </summary>
        /// <param name="user">The user</param>
        /// <returns>A token as a <see cref="string"/> </returns>
        private async Task<SecurityTokenDescriptor> GenerateTokenAsync(User user)
        {
            try
            {
                var key = Encoding.ASCII.GetBytes(_settings.GetSection("JwtSettings")["SecretKey"]);
                var userRole = await _userManager.GetRolesAsync(user);
                var role = userRole.First();
                var tokenDescriptor = new SecurityTokenDescriptor()
                {
                    Subject = new ClaimsIdentity(
                        new Claim[]
                        {
                            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                            new Claim(ClaimTypes.Name, user.LastName),
                            new Claim(ClaimTypes.Email, user.Email),
                            new Claim(ClaimTypes.Role, role),
                            new Claim(ClaimTypes.GivenName, user.FirstName),
                        }),
                    Issuer = _settings.GetSection("JwtSettings")["Issuer"],
                    Audience = _settings.GetSection("JwtSettings")["Audience"],
                    Expires = DateTime.UtcNow.AddMinutes(Convert.ToInt32(_settings.GetSection("JwtSettings")["DurationInMinutes"])),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };

                return tokenDescriptor;
            }
            catch (Exception ex)
            {
                _logger.LogDebug($"Something went wrong");

                throw new NotFoundException("The token descriptor can not be created " + ex.Message);
            }
        }

        /// <summary>
        /// Function to generate a refresh token
        /// </summary>
        /// <returns>Refresh Token as  a <see cref="string"/></returns>
        private string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];

            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);

                return Convert.ToBase64String(randomNumber);
            }
        }

        /// <summary>
        /// <inheritdoc/>
        /// </summary>
        /// <param name="id">The id of the user</param>
        /// <returns>A List of <see cref="UserClaim"/></returns>
        public Task<List<UserClaim>> GetUserClaimsAsync(int id, CancellationToken cancellationToken)
        {
            var result = _userClaimRepository.GetUserClaimsAsync(id, cancellationToken);

            if (result == null)
            {
                _logger.LogError("An error occured the claim were not found");

                throw new NotFoundException("Claims was not found");
            }

            return result;
        }

        /// <summary>
        /// Check the user info validation
        /// </summary>
        /// <param name="email">The user email that we want verify credentials</param>
        /// <param name="password">The password of the user</param>
        /// <returns>Boolean value by result of the task</returns>
        private async Task<User> ValidateUserAsync(string email, string password)
        {
            var userLooked = await _userManager.FindByEmailAsync(email);
            var result = await _userManager.CheckPasswordAsync(userLooked, password);

            if (result == false || userLooked == null)
            {
                _logger.LogError("The user wasn't found or check your password with email");

                throw new NotFoundException("The user was not found");
            }

            return userLooked;
        }

        /// <summary>
        /// Function to refresh the token that has expired
        /// </summary>
        /// <param name="token">The refresh token that has expired</param>
        /// <returns>A <see cref="Task"/> that contains the token</returns>
        public async Task<TokenDTO> RefreshTokenAsync(string token, CancellationToken cancellationToken)
        {
            var tokenLooked = await _repository.GetSavedRefreshTokensAsync(token, cancellationToken);

            if (tokenLooked == null || tokenLooked.IsActive == false)
            {
                _logger.LogError("Error occured while processing the request");

                throw new NotFoundException("Refresh token not found");
            }

            var user = await _userManager.FindByEmailAsync(tokenLooked.User.Email);

            if (user == null)
            {
                _logger.LogError("Error occured User Not Found");

                throw new NotFoundException("Error occured User Not Found");
            }

            var refreshTokenToSave = GenerateRefreshToken();
            tokenLooked.RefreshToken = refreshTokenToSave;
            tokenLooked.CreationDate = DateTimeOffset.Now;

            _repository.Update(tokenLooked);
            await _saveChangesRepository.SaveChangesAsync(cancellationToken);

            var tokenHandler = new JwtSecurityTokenHandler();
            var securityTokenDescriptor = await GenerateTokenAsync(user);

            return new TokenDTO
            {            
                AccessToken = tokenHandler.WriteToken(tokenHandler.CreateToken(securityTokenDescriptor)),
                RefreshToken = refreshTokenToSave,
                TokenLifeTimeInMinutes = Convert.ToInt32(_settings["JwtSettings:LifeTimeRefresh"]),
            };
        }
    }
}
