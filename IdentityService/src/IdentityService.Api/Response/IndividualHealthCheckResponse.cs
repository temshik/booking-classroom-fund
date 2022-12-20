namespace IdentityService.Api.Response
{
    public class IndividualHealthCheckResponse
    {
        public string Status { get; set; }

        public string Component { get; set; }

        public string Description { get; set; }
        
        public string Components { get; internal set; }
    }

}
