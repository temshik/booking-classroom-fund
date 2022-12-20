namespace IdentityService.Api.Requests
{
    /// <summary>
    /// The password for update request
    /// </summary>
    public class PasswordRequestUpdate
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

        /// <summary>
        /// Old password of the user
        /// </summary>
        public string OldPassword { get; set; }
    }
}
