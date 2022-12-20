namespace IdentityService.Api.Requests
{
    /// <summary>
    /// The user for login request
    /// </summary>
    public class UserRequestLogin
    {
        /// <summary>
        /// The email of the user
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// The password of the user
        /// </summary>
        public string Password { get; set; }

        /// <summary>
        /// RememberMe cheakbox
        /// </summary>
        public bool RememberMe { get; set; }

        /// <summary>
        /// Redirecting the user who has successfully authenticated
        /// to the page from which he came
        /// </summary>
        public string ReturnUrl { get; set; }
    }
}
