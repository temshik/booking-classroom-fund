using AutoMapper;
using IdentityService.BusinessLogic.DTOs;
using IdentityService.BusinessLogic.Exceptions;
using IdentityService.DataAccess.Models;
using IdentityService.DataAccess.Repository;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace IdentityService.BusinessLogic.Services
{
    /// <summary>
    /// Serice for base user operations
    /// </summary>
    public class UserService : IUserService
    {
        private readonly SignInManager<User> _signInManager;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<Role> _roleManager;
        private readonly ILogger<UserService> _logger;
        private readonly IUserClaimRepository _repository;
        private readonly IRefreshTokenRepository _refreshRepository;
        private readonly ISaveChangesRepository _saveChangesRepository;

        /// <summary>
        /// Initializes a new instance of <see cref="UserService"/ class.>
        /// </summary>
        /// <param name="userManager">The user manager from identity</param>
        /// <param name="mapper">The mapper to map object</param>
        /// <param name="logger">The logger to log information</param>     
        public UserService(SignInManager<User> signInManager,
            UserManager<User> userManager,
            RoleManager<Role> roleManager,
            IMapper mapper,
            ILogger<UserService> logger,
            IUserClaimRepository repository,
            IRefreshTokenRepository refreshRepository,
            ISaveChangesRepository saveChangesRepository)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _roleManager = roleManager;
            _mapper = mapper;
            _logger = logger;
            _repository = repository;
            _refreshRepository = refreshRepository;
            _saveChangesRepository = saveChangesRepository;
        }

        /// <summary>
        /// Logout the current user from the application
        /// </summary>
        /// <returns>Task</returns>
        public async Task LogoutAsync()
        {
            await _signInManager.SignOutAsync();
        }

        /// <summary>
        /// Creates a new user
        /// </summary>
        /// <param name="user">The user that we want to add</param>
        /// <param name="password">The use password</param>
        /// <returns>Task</returns>
        public async Task<bool> CreateUserAsync(UserDTO user, string password, string roleName)
        {
            var userMapped = _mapper.Map<User>(user);

            using (_userManager)
            {
                var userLooked = await _userManager.FindByEmailAsync(user.Email);

                if (userLooked == null)
                {
                    userMapped.SecurityStamp = Guid.NewGuid().ToString();
                    userMapped.RegistrationDate = DateTimeOffset.Now;
                    var result = await _userManager.CreateAsync(userMapped, password);
                    if (await _roleManager.RoleExistsAsync(roleName) == true)
                    {
                        await _userManager.AddToRoleAsync(userMapped, roleName);
                    }

                    return result.Succeeded;
                }
                else
                {
                    _logger.LogError("Error while creating a user");

                    throw new AlreadyExistException("This user is already exists");
                }
            }
        }

        /// <summary>
        /// Delete the user
        /// </summary>
        /// <param name="user">The user that we want to delete</param>
        /// <returns>User</returns>
        public async Task<bool> DeleteUserAsync(PasswordDTO user)
        {
            using (_userManager)
            {
                var userLooked = await _userManager.FindByEmailAsync(user.Email);
                var isOldPasswordCorrect = await _userManager.CheckPasswordAsync(userLooked, user.NewPassword);

                if (userLooked != null && isOldPasswordCorrect)
                {
                    var token = await _refreshRepository.GetSavedRefreshTokensByUserIdAsync(userLooked.Id);
                    if (token != null)
                    {
                        _refreshRepository.Delete(token);
                    }

                    var result = await _userManager.DeleteAsync(userLooked);

                    return result.Succeeded;
                }
                else
                {
                    _logger.LogError("Error occured while deleting the user");

                    throw new NotFoundException("The user was not found or non correct password");
                }
            }
        }

        /// <summary>
        /// Change password if user has forgotten it
        /// </summary>
        /// <param name="user">The user for whom we want to reset the password</param>
        /// <param name="token">The token that will be reset</param>
        /// <param name="newPassword">The new user's password</param>
        /// <returns>Boolean value by result of the task</returns>
        public async Task<bool> ResetUserPasswordAsync(PasswordDTO user)
        {
            using (_userManager)
            {
                var userLooked = await _userManager.FindByEmailAsync(user.Email);

                if (userLooked != null)
                {
                    string resetToken = await _userManager.GeneratePasswordResetTokenAsync(userLooked);
                    var result = await _userManager.ResetPasswordAsync(userLooked, resetToken, user.NewPassword);

                    return result.Succeeded;
                }
                else
                {
                    _logger.LogError("Error occured while reseting a user password");

                    throw new NotFoundException("The user was not found");
                }
            }
        }

        /// <summary>
        /// Changes the account's password
        /// </summary>
        /// <param name="user">The user for whom we want to update the password</param>
        /// <param name="oldPassword">The old password of the user</param>
        /// <param name="newPassword">The new password of the user</param>
        /// <returns>Boolean value by result of the task</returns>
        public async Task<bool> UpdateUserPasswordAsync(PasswordDTO user)
        {
            using (_userManager)
            {
                var userLooked = await _userManager.FindByEmailAsync(user.Email);
                var userMapped = _mapper.Map<User>(userLooked);
                var isOldPasswordCorrect = await _userManager.CheckPasswordAsync(userMapped, user.OldPassword);

                if (userLooked != null && isOldPasswordCorrect)
                {
                    var result = await _userManager.ChangePasswordAsync(userMapped, user.OldPassword, user.NewPassword);

                    return result.Succeeded;
                }
                else
                {
                    _logger.LogError("The user was not found or the old password is not correct while updating the user password");

                    throw new NotFoundException("The user was not found or not-correct password");
                }
            }
        }

        /// <summary>
        /// Updates user info
        /// </summary>
        /// <param name="user">The updated user</param>
        /// <returns>User</returns>
        public async Task<bool> UpdateUserAsync(UserDTO user)
        {
            var userMapped = _mapper.Map<User>(user);

            using (_userManager)
            {
                var userLooked = await _userManager.FindByEmailAsync(userMapped.Email);
                if (userLooked != null)
                {
                    userLooked.FirstName = userMapped.FirstName;
                    userLooked.LastName = userMapped.LastName;
                    userLooked.SecurityStamp = Guid.NewGuid().ToString();

                    var result = await _userManager.UpdateAsync(userLooked);

                    return result.Succeeded;
                }
                else
                {
                    _logger.LogError("Error while updating a user");

                    throw new NotFoundException("The user not found");
                }
            }
        }

        /// <summary>
        /// Update the claims of the user
        /// </summary>
        /// <param name="user">The user that we want to update the claims</param>
        /// <returns>Task</returns>
        public async Task UpdateUserClaimsAsync(UserDTO user, CancellationToken cancellationToken)
        {
            using (_userManager)
            {
                var userLooked = await _userManager.FindByEmailAsync(user.Email);

                if (userLooked != null)
                {
                    var claims = await _repository.GetUserClaimsAsync(userLooked.Id, cancellationToken);

                    if (claims != null)
                    {
                        _repository.Update(claims);

                        await _saveChangesRepository.SaveChangesAsync(cancellationToken);
                    }
                    else
                    {
                        _logger.LogError("The claims aren't found");
                    }
                }
                else
                {
                    _logger.LogError("Error occured while the updating user claims");

                    throw new NotFoundException("The user was not found");
                }
            }
        }

        /// <summary>
        /// Function to get the roles from the database.
        /// </summary>
        /// <returns>A List of <see cref="PasswordDTO"/>.</returns>
        public async Task<List<Role>> GetRolesAsync(CancellationToken cancellationToken)
        {
            var listResult = await _roleManager.Roles.ToListAsync(cancellationToken);

            if (listResult == null)
            {
                _logger.LogError("Roles dosen't exist");

                throw new NotFoundException("Roles was not found");
            }

            return listResult;
        }
    }
}
