using Newtonsoft.Json;
using RabbitMQ.Client;
using RabbitMQ.Producer.Utility;
using System.Text;

namespace RabbitMQ.Producer
{
    public static class MessageSenderRabbitMQ
    {
        public static void SendMessage<T>(T message)
        {

            var factory = new ConnectionFactory()
            {
                Uri = new Uri("amqp://guest:guest@localhost:5672")
            };
            using var connection = factory.CreateConnection();
            using var channel = connection.CreateModel();

            channel.ExchangeDeclare("workspace-topic-exchange", ExchangeType.Topic);

            //var message = new { Name = "Producer", Message = "Hello!" };
            var body = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(message));

            channel.BasicPublish("workspace-topic-exchange", "account.init", null, body);
        }
    }
}
