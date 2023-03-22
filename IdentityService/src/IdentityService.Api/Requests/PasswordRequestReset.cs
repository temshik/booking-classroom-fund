namespace IdentityService.Api.Requests
{
    /// <summary>
    /// The password for reset request
    /// </summary>
    public class PasswordRequestReset
    {
        /// <summary>
        /// The email of the user
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// New password of the user
        /// </summary>
        public string Password { get; set; }
    }
}
