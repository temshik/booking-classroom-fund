using CatalogService.DataAccess.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CatalogService.DataAccess.Configurations
{
    /// <summary>
    /// Workspace configuration class is done using OnModelCreating method of the context class.
    /// </summary>
    public class WorkspaceConfiguration : IEntityTypeConfiguration<Workspace>
    {
        /// <summary>
        /// Changing the model configuration for relationships.
        /// </summary>
        /// <param name="builder">The model builder.</param>
        public void Configure(EntityTypeBuilder<Workspace> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(i => i.Id)
                .IsRequired()
                .ValueGeneratedOnAdd();

            builder.Property(i => i.CampusNumber)
                .IsRequired(true);
            builder.Property(i => i.WorkspaceNumber)
                .IsRequired(true);
            builder.Property(i => i.Description)
                .IsRequired(true);
            builder.Property(i => i.NumberOfSeats)
                .IsRequired(true);
            builder.Property(i => i.IsAvailable)
                .IsRequired(true);

            builder.HasOne(i => i.Category)
                .WithMany(x => x.Workspaces);

            builder.ToTable("Workspaces");
        }
    }
}
