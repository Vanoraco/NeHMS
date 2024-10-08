using HospitalManagementSystem.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HospitalManagementSystem.API.Configuration
{
    public class InventorySupplyConfigurations : IEntityTypeConfiguration<InventorySupply>
    {
        public void Configure(EntityTypeBuilder<InventorySupply> builder)
        {
            builder.Property(IS => IS.Id)
               .IsRequired()
               .HasMaxLength(50);
            builder.Property(IS => IS.Name)
              .IsRequired()
              .HasMaxLength(50);
            builder.Property(IS => IS.Description)
              .HasMaxLength(50);
            builder.Property(IS => IS.Address)
              .IsRequired()
              .HasMaxLength(50);
            builder.Property(IS => IS.PhoneNumber)
              .IsRequired()
              .HasMaxLength(50);
        }
    }
}
