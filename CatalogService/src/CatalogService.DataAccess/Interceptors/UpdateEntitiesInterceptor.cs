using CatalogService.DataAccess.Models;
using EventBus.Messages.Events;
using EventBus.Messages.Events.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using RabbitMQ.Producer.AsyncDataService;

namespace CatalogService.DataAccess.Interceptors
{
    public sealed class UpdateEntitiesInterceptor : SaveChangesInterceptor
    {
        private readonly IMessageProducer _messageProducer;
        public UpdateEntitiesInterceptor(IMessageProducer messageProducer)
        {
            _messageProducer = messageProducer;
        }

        public override ValueTask<InterceptionResult<int>> SavingChangesAsync(
            DbContextEventData eventData,
            InterceptionResult<int> result,
            CancellationToken cancellationToken = default)
        {
            var dbContext = eventData.Context;

            if (dbContext == null)
            {
                return base.SavingChangesAsync(
                eventData,
                result,
                cancellationToken);
            }

            var entries = dbContext.ChangeTracker
                .Entries<Workspace>();

            foreach (var entityEntry in entries)
            {
                if (entityEntry.State == EntityState.Modified)
                {
                    if (entityEntry.Property(a => a.IsAvailable).CurrentValue == true)
                    {
                        _messageProducer.PublishUpdatedEvent(new WorkspaceUpdatedEvent()
                        {
                            WorkspaceId = entityEntry.Property(a => a.Id).CurrentValue,
                            Event = EventType.UnBlock.ToString(),
                        });
                    }
                    else
                    {
                        _messageProducer.PublishUpdatedEvent(new WorkspaceUpdatedEvent()
                        {
                            WorkspaceId = entityEntry.Property(a => a.Id).CurrentValue,
                            Event = EventType.Block.ToString(),
                        });
                    }
                }
                if (entityEntry.State == EntityState.Deleted)
                {
                    _messageProducer.PublishUpdatedEvent(new WorkspaceUpdatedEvent()
                    {
                        WorkspaceId = entityEntry.Property(a => a.Id).CurrentValue,
                        Event = EventType.Delete.ToString(),
                    });
                }
            }

            return base.SavingChangesAsync(
                eventData,
                result,
                cancellationToken);
        }
    }
}
