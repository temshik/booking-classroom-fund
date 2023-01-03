using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using RabbitMQ.Client;
using System.Text;

namespace RabbitMQ.Producer.AsyncDataService
{
    public class MessageProducer : IMessageProducer
    {
        private readonly IConfiguration _configuration;
        private readonly IConnection _connection;
        private readonly IModel _channel;
        private readonly ILogger<MessageProducer> _logger;

        public MessageProducer(IConfiguration configuration, ILogger<MessageProducer> logger)
        {
            _logger = logger;
            _configuration = configuration;

            //var rabbitHostName = Environment.GetEnvironmentVariable("RABBIT_HOSTNAME");
            var host = _configuration["RabbitMQHost"] ?? "rabbitmq";
            var port = _configuration["RabbitMQPort"] ?? "5672";
            var username = _configuration["RabbitMQUser"] ?? "user";
            var password = _configuration["RabbitMQPassword"] ?? "mypass";
            var factory = new ConnectionFactory()
            {
                Uri = new Uri($"amqp://{username}:{password}@{host}:{port}")
            };
            try
            {
                _connection = factory.CreateConnection();
                _channel = _connection.CreateModel();

                _channel.ExchangeDeclare("workspace-topic-exchange", ExchangeType.Topic);

                _connection.ConnectionShutdown += RabbitMQ_ConnectionShutdown;

                _logger.LogInformation("Connected to MessageBus");
            }
            catch (Exception ex)
            {
                _logger.LogError($"Could not connect to the Message Bus: {ex.Message}");
            }
        }

        public void PublishUpdatedEvent<T>(T obj)
        {
            var message = JsonConvert.SerializeObject(obj);

            if (_connection.IsOpen)
            {
                _logger.LogInformation("RabbitMQ connection is open, sending message...");
                SendMessage(message);
            }
            else
            {
                _logger.LogInformation("RabbitMQ connection is closed, not sending");
            }
        }

        private void SendMessage(string message)
        {
            var body = Encoding.UTF8.GetBytes(message);

            _channel.BasicPublish("workspace-topic-exchange", "account.init", null, body);
            _logger.LogInformation($"Message: {message} have sent");
        }

        private void RabbitMQ_ConnectionShutdown(object sender, ShutdownEventArgs e)
        {
            _logger.LogInformation("RabbitMQ Connection Shutdown");
        }

        public void Dispose()
        {
            _logger.LogInformation("MessageBus Disposed");
            if (_channel.IsOpen)
            {
                _channel.Close();
                _connection.Close();
            }
        }
    }
}
