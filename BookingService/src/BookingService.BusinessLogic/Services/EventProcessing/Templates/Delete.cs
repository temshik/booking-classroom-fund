namespace BookingService.BusinessLogic.Services.EventProcessing.Templates
{
    public class Delete : EventTemplate
    {
        public override void ExecuteWorkspaceUpdate(IBookService bookingService, int workspaceId)
        {
            bookingService.ExecuteDeleteAsync(workspaceId);
        }
    }
}
