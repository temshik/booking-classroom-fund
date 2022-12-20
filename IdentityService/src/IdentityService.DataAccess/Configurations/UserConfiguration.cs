using IdentityService.DataAccess.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace IdentityService.DataAccess.Configurations
{
    /// <summary>
    /// Identity User Configuration class is done using OnModelCreating method of the context class
    /// </summary>
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        /// <summary>
        /// Changing the model configuration for relationships
        /// </summary>
        /// <param name="modelBuilder">The model builder</param>
        public void Configure(EntityTypeBuilder<User> modelBuilder)
        {
            modelBuilder.Property(i => i.Id).IsRequired();
            modelBuilder.Property(i => i.PasswordHash).IsRequired();
            modelBuilder.Property(i => i.PhoneNumber).IsRequired(false);
            modelBuilder.Property(i => i.UserName).IsRequired();
            modelBuilder.Property(i => i.Email).IsRequired();

            modelBuilder.HasMany(e => e.Claims)
                .WithOne(e => e.User)
                .HasForeignKey(uc => uc.UserId)
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();

            modelBuilder.HasMany(e => e.Tokens)
                        .WithOne(e => e.User)
                        .HasForeignKey(ut => ut.UserId)
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

            modelBuilder.ToTable("Users");
        }
    }
}
