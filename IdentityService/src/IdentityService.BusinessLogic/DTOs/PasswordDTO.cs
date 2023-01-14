namespace IdentityService.BusinessLogic.DTOs
{
    /// <summary>
    /// Data transfer object for password
    /// </summary>
    public class PasswordDTO
    {
        /// <summary>
        /// The email of the user
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// New password of the user
        /// </summary>
        public string NewPassword { get; set; }

        /// <summary>
        /// Old password of the user
        /// </summary>
        public string OldPassword { get; set; }
    }
}
