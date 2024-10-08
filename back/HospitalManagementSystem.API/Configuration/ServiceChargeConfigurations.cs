using HospitalManagementSystem.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HospitalManagementSystem.API.Configuration
{
    public class ServiceChargeConfigurations : IEntityTypeConfiguration<ServiceCharge>
    {
        public void Configure(EntityTypeBuilder<ServiceCharge> builder)
        {
            builder.Property(sc => sc.Name)
               .IsRequired();
            builder.Property(sc => sc.Price)
              .IsRequired();
        }
    }
}
