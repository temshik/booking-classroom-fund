using CatalogService.DataAccess.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CatalogService.DataAccess.Configurations
{
    /// <summary>
    /// Category configuration class is done using OnModelCreating method of the context class.
    /// </summary>
    public class CategoryConfiguration : IEntityTypeConfiguration<Category>
    {
        /// <summary>
        /// Changing the model configuration for relationships.
        /// </summary>
        /// <param name="builder">The model builder</param>
        public void Configure(EntityTypeBuilder<Category> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(i => i.Id)
                .IsRequired(true)
                .ValueGeneratedOnAdd();

            builder.Property(i => i.Name)
                .IsRequired(true);
            builder.Property(i => i.SpecialEquipment)
                .IsRequired(true);

            builder.ToTable("Categories");
        }
    }
}
