using IdentityService.DataAccess.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace IdentityService.DataAccess.Configurations
{
    /// <summary>
    /// Identity User Token Configuration class is done using OnModelCreating method of the context class
    /// </summary>
    public class TokenConfiguration : IEntityTypeConfiguration<UserRefreshToken>
    {
        /// <summary>
        /// Changing the model configuration database name
        /// </summary>
        /// <param name="modelBuilder"></param>       
        public void Configure(EntityTypeBuilder<UserRefreshToken> modelBuilder)
        {
            modelBuilder.HasKey(x => x.Id);
            modelBuilder.Property(x => x.Id)
                .ValueGeneratedOnAdd();

            modelBuilder.Property(x => x.RefreshToken)
                .IsRequired(true);
            modelBuilder.Property(x => x.LifeRefreshTokenInMinutes)
                .IsRequired(true);
            modelBuilder.Property(x => x.CreationDate)
                .IsRequired(true);
            modelBuilder.Ignore(x => x.IsActive);
            modelBuilder.HasOne(x => x.User)
                .WithMany(x => x.Tokens);

            modelBuilder.ToTable("Tokens");
        }
    }
}
