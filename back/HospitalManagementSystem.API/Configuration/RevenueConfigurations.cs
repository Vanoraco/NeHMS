using HospitalManagementSystem.API.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace HospitalManagementSystem.API.Configuration
{
    public class RevenueConfigurations : IEntityTypeConfiguration<Revenue>
    {
        public void Configure(EntityTypeBuilder<Revenue> builder)
        {
            builder.Property(r => r.Id)
                .IsRequired();
            builder.Property(r => r.RevenueCategoryId)
              .IsRequired();
            builder.Property(r => r.Amount)
              .IsRequired()
             .HasMaxLength(50);
            builder.Property(e => e.Date)
             .IsRequired();
            builder.Property(r => r.Description)
              .IsRequired()
             .HasMaxLength(50);
        }
    }
}