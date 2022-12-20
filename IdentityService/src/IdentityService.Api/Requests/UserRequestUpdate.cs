namespace IdentityService.Api.Requests
{
    /// <summary>
    /// The user for update request
    /// </summary>
    public class UserRequestUpdate
    {
        /// <summary>
        /// The user name at the application
        /// </summary>
        public string UserName { get; set; }

        /// <summary>
        /// The email of the user
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// The password of the user
        /// </summary>
        public string Password { get; set; }
    }
}
