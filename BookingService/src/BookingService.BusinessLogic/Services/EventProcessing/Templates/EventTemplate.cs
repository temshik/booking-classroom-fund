using EventBus.Messages.Events;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System.Text.Json;

namespace BookingService.BusinessLogic.Services.EventProcessing.Templates
{
    public abstract class EventTemplate
    {
        public void ExecuteEvent(IServiceScopeFactory _scopeFactory, string workspacePublishedMessage, ILogger _logger)
        {
            using (var scope = _scopeFactory.CreateScope())
            {
                var bookingService = scope.ServiceProvider.GetRequiredService<IBookService>();

                var workspaceUpdatedEvent = JsonSerializer.Deserialize<WorkspaceUpdatedEvent>(workspacePublishedMessage);

                try
                {
                    if (bookingService.IsExternalWorkspaceExists(workspaceUpdatedEvent.WorkspaceId))
                    {
                        ExecuteWorkspaceUpdate(bookingService, workspaceUpdatedEvent.WorkspaceId);
                    }
                    else
                    {
                        _logger.LogInformation("Workspace criteria does not applied for booking");
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError($"Could not blocked the workspace in the DB {ex.Message}");
                }
            }

        }

        public abstract void ExecuteWorkspaceUpdate(IBookService bookingService, int workspaceId);
    }
}
