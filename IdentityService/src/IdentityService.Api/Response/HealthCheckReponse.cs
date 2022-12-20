﻿namespace IdentityService.Api.Response
{
    public class HealthCheckReponse
    {
        public string Status { get; set; }

        public IEnumerable<IndividualHealthCheckResponse> HealthChecks { get; set; }

        public TimeSpan HealthCheckDuration { get; set; }
    }
}
