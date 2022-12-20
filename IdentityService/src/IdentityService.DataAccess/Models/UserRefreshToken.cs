namespace IdentityService.DataAccess.Models
{
    /// <summary>
    /// Structure of refresh token at database
    /// </summary>
    public class UserRefreshToken
    {
        /// <summary>
        /// The Id of the user refresh Token
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// The id of the user that has the refresh token
        /// </summary>
        public int UserId { get; set; }

        /// <summary>
        /// Navigation property for the user
        /// </summary>
        public User User { get; set; }

        /// <summary>
        /// The refresh Token code
        /// </summary>
        public string RefreshToken { get; set; }

        /// <summary>
        /// The creation of the refresh token
        /// </summary>
        public DateTimeOffset CreationDate { get; set; } = DateTimeOffset.Now;

        /// <summary>
        /// The validaty time of refresh token
        /// </summary>
        public int LifeRefreshTokenInMinutes { get; set; }


        /// <summary>
        /// If the refresh token is active or not
        /// </summary>
        public bool IsActive
        {
            get
            {
                if (DateTimeOffset.Now < CreationDate.AddMinutes(LifeRefreshTokenInMinutes))
                {
                    return true;
                }

                return false;
            }
        }
    }
}
