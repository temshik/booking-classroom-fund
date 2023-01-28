namespace CatalogService.Api.Response
{
    /// <summary>
    /// Class to hold the health-status data of each component
    /// </summary>
    public class IndividualHealthCheckResponse
    {
        /// <summary>
        /// Status for Health Check
        /// </summary>
        public string Status { get; set; }

        /// <summary>
        /// Data context component
        /// </summary>
        public string Components { get; internal set; }

        /// <summary>
        /// Short description
        /// </summary>
        public string Description { get; set; }
    }
}
