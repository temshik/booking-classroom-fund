namespace IdentityService.Api.Requests
{
    /// <summary>
    /// The user for create request
    /// </summary>
    public class UserRequestCreate
    {
        /// <summary>
        /// The first Name of the user 
        /// </summary>
        public string FirstName { get; set; }

        /// <summary>
        /// The last name of the user
        /// </summary>
        public string LastName { get; set; }

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

        /// <summary>
        /// The confirmed password
        /// </summary>
        public string ConfirmedPassword { get; set; }
    }
}
