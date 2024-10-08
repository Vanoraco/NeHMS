using HospitalManagementSystem.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HospitalManagementSystem.API.Configuration
{
    public class InventoryConfigurations : IEntityTypeConfiguration<Inventory>
    {
        public void Configure(EntityTypeBuilder<Inventory> builder)
        {
            builder.Property(I => I.Id)
               .IsRequired()
               .HasMaxLength(50);
            builder.Property(I => I.Name)
            .IsRequired()
            .HasMaxLength(50);
            builder.Property(I => I.Description)
            .HasMaxLength(50);
            builder.Property(I => I.Quantity)
            .IsRequired()
            .HasMaxLength(50);
            builder.Property(I => I.ExpireDate)
            .IsRequired()
            .HasMaxLength(50);
            builder.Property(I => I.InventorySupplyId)
            .IsRequired()
            .HasMaxLength(50);
            builder.Property(I => I.EmployeeId)
            .IsRequired()
            .HasMaxLength(50);
            builder.Property(I => I.Date)
            .IsRequired()
            .HasMaxLength(50);
        }
    }
}
