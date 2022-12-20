namespace IdentityService.Api.Requests
{
    /// <summary>
    /// The role for create request
    /// </summary>
    public class RoleRequestCreate
    {
        /// <summary>
        /// The role name at the application
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// The normalized name of the user role
        /// </summary>
        public string NormalizedName { get; set; }

        /// <summary>
        /// The role name description
        /// </summary>
        public string Description { get; set; }
    }
}
