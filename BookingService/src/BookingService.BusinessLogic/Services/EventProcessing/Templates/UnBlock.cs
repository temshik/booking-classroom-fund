namespace BookingService.BusinessLogic.Services.EventProcessing.Templates
{
    public class UnBlock : EventTemplate
    {
        public override void ExecuteWorkspaceUpdate(IBookService bookingService, int workspaceId)
        {
            bookingService.ExecuteUpdateAsync(workspaceId, true);
        }
    }
}
