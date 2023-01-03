using CatalogService.DataAccess.Configurations;
using CatalogService.DataAccess.Interceptors;
using CatalogService.DataAccess.Models;
using Microsoft.EntityFrameworkCore;
using RabbitMQ.Producer.AsyncDataService;

namespace CatalogService.DataAccess
{
    /// <summary>
    /// Catalog database context used to configure the model.
    /// </summary>
    public class CatalogContext : DbContext
    {
        private readonly IMessageProducer _messageProducer;

        /// <summary>
        /// Adding a Database set for the categories.
        /// </summary>
        public DbSet<Category> Categories { get; set; }

        /// <summary>
        /// Adding A database set for the workspaces.
        /// </summary>
        public DbSet<Workspace> Workspaces { get; set; }

        /// <summary>
        ///  Initializes a new instance of the <see cref="CatalogContext"/> class.
        /// </summary>
        /// <param name="options">The database context optrions.</param>
        public CatalogContext(DbContextOptions<CatalogContext> options,
            IMessageProducer messageProducer) : base(options)
        {
            _messageProducer = messageProducer;
        }

        /// <summary>
        /// Method to modify the mapping of these types.
        /// </summary>
        /// <param name="modelBuilder">The model builder</param>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(CatalogContext).Assembly);
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new WorkspaceConfiguration());
            modelBuilder.ApplyConfiguration(new CategoryConfiguration());
        }

        /// <summary>
        /// Method to wire interceptor to DbContext.
        /// </summary>
        /// <param name="options">The dbcontext options builder</param>
        protected override void OnConfiguring(DbContextOptionsBuilder options)
        => options.AddInterceptors(new UpdateEntitiesInterceptor(_messageProducer));
    }
}
