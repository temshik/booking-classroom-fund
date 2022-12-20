namespace IdentityService.BusinessLogic.DTOs
{
    /// <summary>
    /// Data transfer object for Token
    /// </summary>
    public class TokenDTO
    {
        /// <summary>
        /// The token to get authorization
        /// </summary>
        public string AccessToken { get; set; }

        /// <summary>
        /// The token that will be used to refresh the access token
        /// </summary>
        public string RefreshToken { get; set; }

        /// <summary>
        /// The validity time in minutes
        /// </summary>
        public int TokenLifeTimeInMinutes { get; set; }
    }
}
