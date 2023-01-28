namespace BookingService.BusinessLogic.Services.EventProcessing
{
    public interface IEventProcessor
    {
        public void ProcessEvent(string message);
    }
}
