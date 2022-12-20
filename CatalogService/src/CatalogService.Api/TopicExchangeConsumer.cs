using CatalogService.BusinessLogic.Services;
using CatalogService.Contracts.Events;
using Newtonsoft.Json;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;

namespace CatalogService.Api
{
    public class TopicExchangeConsumer : BackgroundService
    {
        private IConnection _connection;
        private IModel _channel;
        private readonly IWorkspaceService _workspaceService;

        public TopicExchangeConsumer(IConnection connection, IModel channel, IWorkspaceService workspaceService)
        {
            _connection = connection;
            _channel = channel;
            _workspaceService = workspaceService;
            InitRabbitMQ();
        }

        public void InitRabbitMQ()
        {
            var RabbitMQServer = "";
            RabbitMQServer = StaticConfigurationManager.AppSetting["RabbitMQSettings:Host"];

            var factory = new ConnectionFactory()
            {
                Uri = new Uri("amqp://guest:guest@localhost:5672")
            };
            //отслеживать ошибку
            _connection = factory.CreateConnection();
            _channel = _connection.CreateModel();

            _channel.ExchangeDeclare("workspace-topic-exchange", ExchangeType.Topic);
            _channel.QueueDeclare("workspace-topic-queue",
                durable: true,
                exclusive: false,
                autoDelete: false,
                arguments: null);
            _channel.QueueBind("workspace-topic-queue", "workspace-topic-exchange", "account.*");

            _connection.ConnectionShutdown += RabbitMQ_ConnectionShutdown;           
        }

        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            stoppingToken.ThrowIfCancellationRequested();

            var consumer = new EventingBasicConsumer(_channel);
            consumer.Received += async (sender, e) =>
            {
                var body = e.Body.ToArray();
                var message = Encoding.UTF8.GetString(body);
                var workspaceUpdatedEvent = JsonConvert.DeserializeObject<WorkspaceUpdatedEvent>(message);

                var item = await _workspaceService.GetWorkspaceAsync(workspaceUpdatedEvent.WorkspaceId, stoppingToken);
                if (item != null)
                {
                    item.WorkspaceNumber = workspaceUpdatedEvent.WorkspaceNumber;
                    item.IsAvailable = workspaceUpdatedEvent.IsAvailable;

                    await _workspaceService.UpdateAsync(item, stoppingToken);
                }
            };

            consumer.Shutdown += OnConsumerShutdown;
            consumer.Registered += OnConsumerRegistered;
            consumer.Unregistered += OnConsumerUnregistered;
            consumer.ConsumerCancelled += OnConsumerConsumerCancelled;

            _channel.BasicConsume("workspace-topic-queue", true, consumer);

            return Task.CompletedTask;
        }

        private void OnConsumerConsumerCancelled(object sender, ConsumerEventArgs e) { }
        private void OnConsumerUnregistered(object sender, ConsumerEventArgs e) { }
        private void OnConsumerRegistered(object sender, ConsumerEventArgs e) { }
        private void OnConsumerShutdown(object sender, ShutdownEventArgs e) { }
        private void RabbitMQ_ConnectionShutdown(object sender, ShutdownEventArgs e) { }

    }
}
