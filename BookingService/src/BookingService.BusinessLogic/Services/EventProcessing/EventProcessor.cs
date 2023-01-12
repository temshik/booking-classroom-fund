using AutoMapper;
using BookingService.BusinessLogic.Services.EventProcessing.Templates;
using EventBus.Messages.Events;
using EventBus.Messages.Events.Enums;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System.Text.Json;

namespace BookingService.BusinessLogic.Services.EventProcessing
{
    public class EventProcessor : IEventProcessor
    {
        private readonly IServiceScopeFactory _scopeFactory;
        private readonly IMapper _mapper;
        private readonly ILogger<EventProcessor> _logger;

        public EventProcessor(IServiceScopeFactory scopeFactory, IMapper mapper, ILogger<EventProcessor> logger)
        {
            _scopeFactory = scopeFactory;
            _mapper = mapper;
            _logger = logger;
        }

        public void ProcessEvent(string message)
        {
            var eventType = DetermineEvent(message);

            switch (eventType)
            {
                case EventType.Block:
                    var block = new Block();
                    block.ExecuteEvent(_scopeFactory, message, _logger);
                    break;
                case EventType.Unlock:
                    var unlock = new Unlock();
                    unlock.ExecuteEvent(_scopeFactory, message, _logger);
                    break;
                case EventType.Delete:
                    var delete = new Delete();
                    delete.ExecuteEvent(_scopeFactory, message, _logger);
                    break;
                default:
                    break;
            }
        }

        private EventType DetermineEvent(string notificationMessage)
        {
            _logger.LogInformation("Determining Event");
            var workspaceUpdatedEvent = JsonSerializer.Deserialize<WorkspaceUpdatedEvent>(notificationMessage);

            switch (workspaceUpdatedEvent.Event)
            {
                case nameof(EventType.Block):
                    _logger.LogInformation("Workspace Blocked Event Detected");
                    return EventType.Block;
                case nameof(EventType.Unlock):
                    _logger.LogInformation("Workspace Unlocked Event Detected");
                    return EventType.Unlock;
                case nameof(EventType.Delete):
                    _logger.LogInformation("Workspace Deleted Event Detected");
                    return EventType.Delete;
                default:
                    _logger.LogInformation("Could not determine the event type");
                    return EventType.Undetermined;
            }
        }
    }
}
