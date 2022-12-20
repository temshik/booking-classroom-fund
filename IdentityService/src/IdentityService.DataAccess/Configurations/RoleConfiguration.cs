using IdentityService.DataAccess.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace IdentityService.DataAccess.Configurations
{
    /// <summary>
    /// Identity Role Configuration class is done using OnModelCreating method of the context class
    /// </summary>
    public class RoleConfiguration : IEntityTypeConfiguration<Role>
    {
        /// <summary>
        /// Changing the model configuration for relationships
        /// </summary>
        /// <param name="modelBuilder">The model builder</param>
        public void Configure(EntityTypeBuilder<Role> modelBuilder)
        {
            modelBuilder.Property(i => i.Id).IsRequired();
            modelBuilder.Property(i => i.Name).IsRequired();

            modelBuilder.ToTable("Roles");
        }
    }
}
