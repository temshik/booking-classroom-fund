using CatalogService.DataAccess.Models;

namespace CatalogService.BusinessLogic.Services.SyncDataService.Http
{
    public interface IBookingDataClient
    {
        Task SendWorkspaceToBooking(Workspace workspace);
    }
}
