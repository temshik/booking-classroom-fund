using AutoMapper;
using IdentityService.Api.Requests;
using IdentityService.BusinessLogic.DTOs;
using IdentityService.BusinessLogic.DTOs.SeedPrefilingsDatas;
using IdentityService.BusinessLogic.Services;
using IdentityService.DataAccess.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace IdentityService.Api.Controllers
{
    /// <summary>
    /// Users controller
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUserService _userService;

        /// <summary>
        /// Initialzez a new instance of the <see cref="UsersController" /> class.
        /// </summary>
        /// <param name="mapper">AutoMapper registration</param>
        /// <param name="userService">User service</param>
        public UsersController(IMapper mapper,
                               IUserService userService)
        {
            _mapper = mapper;
            _userService = userService;
        }

        /// <summary>
        /// Creates a new user
        /// </summary>
        /// <param name="userRequest">Data of the user we want to create</param>
        /// <param name="cancellationToken">Cancellation token</param>
        /// <returns>New user</returns>
        [Route("[action]/{role}")]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> CreateUser([FromBody] UserRequestCreate userRequest, PrefilingRoleData role, CancellationToken token)
        {
            var userMapped = _mapper.Map<UserDTO>(userRequest);
            var result = await _userService.CreateUserAsync(userMapped, userRequest.Password, role.ToString());

            if (result == false)
            {
                return BadRequest(result);
            }

            return StatusCode(201);
        }

        /// <summary>
        /// Get user by id
        /// </summary>
        /// <param name="id">User id</param>
        /// <param name="cancellationToken">Cancellation token</param>
        /// <returns>User</returns>
        [Route("[action]/{id}")]
        [HttpGet]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetUser(string id, CancellationToken token)
        {            
            var result = await _userService.GetUserAsync(id, token);

            if (result == null)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        /// <summary>
        /// Get user by email
        /// </summary>
        /// <param name="id">User email</param>
        /// <param name="cancellationToken">Cancellation token</param>
        /// <returns>User</returns>
        [Route("[action]")]
        [HttpPost]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetUserByEmail([FromBody] UserRequestGet userRequestGet, CancellationToken token)
        {
            var result = await _userService.GetUserByEmailAsync(userRequestGet.Email, token);

            if (result == null)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        /// <summary>
        /// Exiting the user from the app
        /// </summary>
        /// <param name="email">User email</param>
        /// <param name="token">Cancellation token</param>
        /// <returns>User id if the user is logged out or 
        /// null if he is not logged out</returns>
        [Route("[action]")]
        [HttpPost]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Logout(CancellationToken token)
        {
            await _userService.LogoutAsync();

            return Ok();
        }

        /// <summary>
        /// Updates user info
        /// </summary>
        /// <param name="id">Specific user id</param>
        /// <param name="userRequest">Data of the user we want to update</param>
        /// <param name="token">Cancellation token</param>
        /// <returns>Updated user</returns>
        [Route("[action]")]
        [HttpPut]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateUser([FromBody] UserRequestUpdate userRequest, CancellationToken token)
        {
            var userMapped = _mapper.Map<UserDTO>(userRequest);
            var userwaited = await _userService.UpdateUserAsync(userMapped);

            if (userwaited == false)
            {
                return BadRequest();
            }

            return Ok(userRequest);
        }

        /// <summary>
        /// Delete the user
        /// </summary>
        /// <param name="id">Specific user id</param>
        /// <param name="token">Cancellation token</param>
        /// <returns>Updated list of users</returns>
        [Route("[action]")]
        [HttpDelete]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> DeleteUser([FromBody] PasswordRequestReset userRequest, CancellationToken token)
        {
            var userMapped = _mapper.Map<PasswordDTO>(userRequest);

            var userwaited = await _userService.DeleteUserAsync(userMapped);

            if (userwaited == false)
            {
                return BadRequest();
            }

            return Ok();
        }

        /// <summary>
        /// Update the claims of the user 
        /// </summary>
        /// <param name="id">Specific user id</param>
        /// <param name="token">Cancellation token</param>
        /// <returns>Updated user claims</returns>
        [Route("[action]/{claims}")]
        [HttpPut]
        [Authorize(Roles = "Dispacher, Employee")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> UpdateUserClaims([FromBody] UserRequestUpdate userRequest, [FromRoute] List<Claim> claims, CancellationToken token)
        {
            var userMapped = _mapper.Map<UserDTO>(userRequest);
            var userClaims = _mapper.Map<List<UserClaim>>(claims);
            userMapped.Claims = userClaims;

            await _userService.UpdateUserClaimsAsync(userMapped, token);

            return Ok(userRequest);
        }

        /// <summary>
        /// Changes the account's password
        /// </summary>
        /// <param name="id">Specific user id</param>
        /// <param name="newPassword">New user password</param>
        /// <param name="token">Cancellation token</param>
        /// <returns>Id of the user who updated the password</returns>
        [Route("[action]")]
        [HttpPut]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> UpdatePassword([FromBody] PasswordRequestUpdate userRequest, CancellationToken token)
        {
            var userMapped = _mapper.Map<PasswordDTO>(userRequest);
            var result = await _userService.UpdateUserPasswordAsync(userMapped);

            if (result == false)
            {
                return BadRequest();
            }

            return Ok(userRequest);
        }

        /// <summary>
        /// Change password if user has forgotten the password
        /// </summary>
        /// <param name="id">Specific user id</param>
        /// <param name="token">Cancellation token</param>
        /// <returns>Id of the user who reset the password</returns>
        [Route("[action]")]
        [HttpPut]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> ResetPassword([FromBody] PasswordRequestReset userRequest)
        {
            var userMapped = _mapper.Map<PasswordDTO>(userRequest);
            var result = await _userService.ResetUserPasswordAsync(userMapped);

            if (result == false)
            {
                return BadRequest();
            }

            return Ok(userRequest);
        }

        /// <summary>
        /// Get Roles for adding user role
        /// </summary>
        /// <param name="token">Cancellation token</param>
        /// <returns>List of Roles</returns>
        [Route("[action]")]
        [HttpGet]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetRoles(CancellationToken token)
        {
            var roleList = await _userService.GetRolesAsync(token);

            if (roleList == null)
            {
                return BadRequest();
            }

            return Ok(roleList);
        }
    }
}
