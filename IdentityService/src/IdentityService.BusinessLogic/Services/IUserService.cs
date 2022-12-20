using IdentityService.BusinessLogic.DTOs;
using IdentityService.DataAccess.Models;

namespace IdentityService.BusinessLogic.Services
{
    /// <summary>
    /// Interface for user operations
    /// </summary>
    public interface IUserService
    {
        /// <summary>
        /// Logout the current user from the application
        /// </summary>
        /// <returns>Task</returns>
        Task LogoutAsync();

        /// <summary>
        /// Creates a new user
        /// </summary>
        /// <param name="user">The user that we want to add</param>
        /// <param name="password">The password of the user</param>
        /// <returns>Task</returns>
        Task<bool> CreateUserAsync(UserDTO user, string password, string roleName);

        /// <summary>
        /// Delete the user
        /// </summary>
        /// <param name="user">The user that we want to delete</param>
        /// <returns>User info of user, which was deleted</returns>
        Task<UserDTO> DeleteUserAsync(UserDTO user);

        /// <summary>
        /// Change password if user has forgotten it
        /// </summary>
        /// <param name="user">The user for whom we want to reset the password</param>
        /// <param name="token">The token that will</param>
        /// <param name="newPassword">User new password</param>
        /// <returns>Boolean value by result of the task</returns>
        Task<bool> ResetUserPasswordAsync(UserDTO user, string token, string newPassword);

        /// <summary>
        /// Changes the account's password
        /// </summary>
        /// <param name="user">The user</param>
        /// <param name="oldPassword">The old password of the user</param>
        /// <param name="newPassword">The new password of the user</param>
        /// <returns>>Boolean value by result of the task</returns>
        Task<bool> UpdateUserPasswordAsync(UserDTO user, string oldPassword, string newPassword);

        /// <summary>
        /// Updates user info
        /// </summary>
        /// <param name="user">The user</param>
        /// <returns>>User</returns>
        Task<bool> UpdateUserAsync(UserDTO user);

        /// <summary>
        /// Update the claims of the user
        /// </summary>
        /// <param name="user">The user</param>
        /// <returns>Task</returns>
        Task UpdateUserClaimsAsync(UserDTO user, CancellationToken cancellationToken);

        /// <summary>
        /// Function to get the roles from the database.
        /// </summary>
        /// <returns>A List of <see cref="RoleDTO"/>.</returns>
        Task<List<Role>> GetRolesAsync(CancellationToken cancellationToken);
    }
}
