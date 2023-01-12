using FluentValidation;
using IdentityService.Api.Requests;
using IdentityService.BusinessLogic.Services;
using Microsoft.AspNetCore.Mvc;

namespace IdentityService.Api.Controllers
{
    /// <summary>
    /// Authorization controller
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class AuthorizationController : ControllerBase
    {
        private readonly IAuthorizationService _authorization;

        /// <summary>
        /// Initialzez a new instance of the <see cref="AuthorizationController" /> class.
        /// </summary>
        /// <param name="authorization">Authorization service</param>
        public AuthorizationController(IAuthorizationService authorization)
        {
            _authorization = authorization;
        }

        /// <summary>
        /// Take the credentials as parameters and generate a token to authorize the user
        /// </summary>
        /// <param name="email">User email</param>
        /// <param name="password">User password</param>
        /// <param name="cancellationToken">Cancellation token</param>
        /// <returns></returns>
        [Route("[action]")]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Authorize([FromBody] UserRequestLogin userRequest, CancellationToken cancellationToken)
        {
            var tokenAccess = await _authorization.AuthorizeAsync(userRequest.Email, userRequest.Password, cancellationToken);

            if (tokenAccess == null)
            {
                return Unauthorized();
            }

            return Ok(tokenAccess);
        }

        /// <summary>
        /// To refresh the token if the time of authentication is passed
        /// </summary>
        /// <param name="id">Specific user id</param>
        /// <param name="cancellationToken">Cancellation token</param>
        /// <returns></returns>
        [Route("[action]/{refreshToken}")]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> RefreshToken(string refreshToken, CancellationToken cancellationToken)
        {
            var newToken = await _authorization.RefreshTokenAsync(refreshToken, cancellationToken);

            if (newToken == null)
            {
                return BadRequest();
            }

            return Ok(newToken);
        }

        /// <summary>
        /// Function to get the claim of the user
        /// </summary>
        /// <param name="id">the id of the user</param>
        /// <param name="cancellationToken">cancellation token from the HTTP request</param>
        /// <returns>the claim of the </returns>
        [HttpGet("[action]/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetUserClaim(int id, CancellationToken cancellationToken)
        {
            var claims = _authorization.GetUserClaimsAsync(id, cancellationToken);

            if (claims == null)
            {
                return BadRequest();
            }

            return Ok(claims);
        }
    }
}
