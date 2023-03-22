using CatalogService.DataAccess.Models;
using Microsoft.Extensions.Configuration;
using System.Text;
using System.Text.Json;

namespace CatalogService.BusinessLogic.Services.SyncDataService.Http
{
    public class HttpBookingDataClient : IBookingDataClient
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;

        public HttpBookingDataClient(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _configuration = configuration;
        }

        public async Task SendWorkspaceToBooking(Workspace workspace)
        {
            var httpContent = new StringContent(
                JsonSerializer.Serialize(workspace),
                Encoding.UTF8,
                "application/json");

            var response = await _httpClient.PostAsync($"{_configuration["BookingService"]}", httpContent);

            if (response.IsSuccessStatusCode)
            {

            }
        }
    }
}
