namespace CatalogService.Api.Response
{
    /// <summary>
    /// Class that hold a list of IndividualHealthCheckResponse
    /// </summary>
    public class HealthCheckReponse
    {
        /// <summary>
        /// Status for Health Check
        /// </summary>
        public string Status { get; set; }

        /// <summary>
        /// The list of IndividualHealthCheckResponse
        /// </summary>
        public IEnumerable<IndividualHealthCheckResponse> HealthChecks { get; set; }

        /// <summary>
        /// The Health Check time duration
        /// </summary>
        public TimeSpan HealthCheckDuration { get; set; }
    }
}
