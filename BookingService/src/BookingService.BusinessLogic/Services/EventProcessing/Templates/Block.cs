namespace BookingService.BusinessLogic.Services.EventProcessing.Templates
{
    public class Block : EventTemplate
    {
        public override void ExecuteWorkspaceUpdate(IBookService bookingService, int workspaceId)
        {
            bookingService.ExecuteUpdateAsync(workspaceId, false);
        }
    }
}
