using BookingService.BusinessLogic.Services.EventProcessing;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;

namespace BookingService.BusinessLogic.Services.AsyncDataServices
{
    public class MessageSubscriber : BackgroundService
    {
        private IConnection _connection;
        private IModel _channel;
        private readonly IConfiguration _configuration;
        private readonly IEventProcessor _eventProcessor;
        private readonly ILogger<MessageSubscriber> _logger;

        public MessageSubscriber(
            IConfiguration configuration,
            IEventProcessor eventProcessor,
            ILogger<MessageSubscriber> logger)
        {
            _configuration = configuration;
            _eventProcessor = eventProcessor;
            _logger = logger;
            InitRabbitMQ();
        }

        public void InitRabbitMQ()
        {
            var factory = new ConnectionFactory()
            {
                HostName = _configuration["RabbitMQHost"] ?? "",
                Port = int.Parse(_configuration["RabbitMQPort"] ?? ""),
                UserName = _configuration["RabbitMQUser"] ?? "",
                Password = _configuration["RabbitMQPassword"] ?? "",
            };
            try
            {
                _connection = factory.CreateConnection();
                _channel = _connection.CreateModel();

                _channel.ExchangeDeclare("workspace-topic-exchange", ExchangeType.Topic);
                _channel.QueueDeclare("workspace-topic-queue",
                    durable: true,
                    exclusive: false,
                    autoDelete: false,
                    arguments: null);
                _channel.QueueBind("workspace-topic-queue", "workspace-topic-exchange", "account.*");

                _logger.LogInformation("Listening on the MessageBus");

                _connection.ConnectionShutdown += RabbitMQ_ConnectionShutdown;  
            }
            catch(Exception ex)
            {
                _logger.LogError($"Could not connect to the Message Bus: {ex.Message}");
            }
        }

        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            stoppingToken.ThrowIfCancellationRequested();

            var consumer = new EventingBasicConsumer(_channel);
            consumer.Received += async (sender, e) => {
                _logger.LogInformation("Event Received");

                var body = e.Body.ToArray();
                var message = Encoding.UTF8.GetString(body);
                
                _eventProcessor.ProcessEvent(message);
            };

            _channel.BasicConsume("workspace-topic-queue", true, consumer);

            consumer.Shutdown += OnConsumerShutdown;
            consumer.Registered += OnConsumerRegistered;
            consumer.Unregistered += OnConsumerUnregistered;
            consumer.ConsumerCancelled += OnConsumerConsumerCancelled;

            return Task.CompletedTask;
        }

        private void OnConsumerConsumerCancelled(object sender, ConsumerEventArgs e) { }
        private void OnConsumerUnregistered(object sender, ConsumerEventArgs e) { }
        private void OnConsumerRegistered(object sender, ConsumerEventArgs e) { }
        private void OnConsumerShutdown(object sender, ShutdownEventArgs e) { }
        private void RabbitMQ_ConnectionShutdown(object sender, ShutdownEventArgs e) 
        {
            _logger.LogInformation("RabbitMQ Connection Shutdown");
        }

        public override void Dispose()
        {
            _logger.LogInformation("MessageBus Disposed");
            if (_channel.IsOpen)
            {
                _channel.Close();
                _connection.Close();
            }

            base.Dispose();
        }
    }
}
