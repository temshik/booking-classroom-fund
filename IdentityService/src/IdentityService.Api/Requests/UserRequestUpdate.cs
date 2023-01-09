namespace IdentityService.Api.Requests
{
    /// <summary>
    /// The user for update request
    /// </summary>
    public class UserRequestUpdate
    {
        /// <summary>
        /// User first name
        /// </summary>
        public string FirstName { get; set; }

        /// <summary>
        /// User surname
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
    }
}
