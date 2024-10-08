using HospitalManagementSystem.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HospitalManagementSystem.API.Configuration
{
    public class BillLabConfigurations : IEntityTypeConfiguration<BillLab>
    {
        public void Configure(EntityTypeBuilder<BillLab> builder)
        {
            builder.Property(bl => bl.Id)
              .IsRequired();
              
            builder.Property(bl => bl.LabRequestId)
              .IsRequired();
             
            builder.Property(bl => bl.ServiceChargeId)
              .IsRequired();

            builder.Property(bl => bl.Date)
              .IsRequired();
              
            builder.Property(bl => bl.Description)
              .HasMaxLength(250);
            builder.Property(bl => bl.EmployeeId)
              .IsRequired();
             
        }
    }
}
