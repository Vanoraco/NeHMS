using HospitalManagementSystem.API.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace HospitalManagementSystem.API.Configuration
{
    public class RevenueCategoryConfigurations : IEntityTypeConfiguration<RevenueCategory>
    {
        public void Configure(EntityTypeBuilder<RevenueCategory> builder)
        {
            builder.Property(rc => rc.Id)
               .IsRequired();
            builder.Property(rc => rc.Name)
               .HasMaxLength(50)
            .HasMaxLength(50);
            builder.Property(rc => rc.Description)
              .HasMaxLength(50)
           .HasMaxLength(50);
        }
    }
}