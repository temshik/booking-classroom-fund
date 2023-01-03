namespace RabbitMQ.Producer.AsyncDataService
{
    public interface IMessageProducer
    {
        public void PublishUpdatedEvent<T>(T message);
    }
}
