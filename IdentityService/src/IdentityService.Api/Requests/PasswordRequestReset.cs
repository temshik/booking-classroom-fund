namespace IdentityService.Api.Requests
{
    /// <summary>
    /// The password for reset request
    /// </summary>
    public class PasswordRequestReset
    {
        /// <summary>
        /// The identifier of the user
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        /// The email of the user
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// New password of the user
        /// </summary>
        public string NewPassword { get; set; }
    }
}
