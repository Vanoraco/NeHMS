using HospitalManagementSystem.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HospitalManagementSystem.API.Configuration
{
    public class MedicalCertificateConfigurations : IEntityTypeConfiguration<MedicalCertificate>
    {
        public void Configure(EntityTypeBuilder<MedicalCertificate> builder)
        {
            builder.Property(m => m.Id)
              .IsRequired();

            builder.Property(m => m.EmployeeId)
               .IsRequired();

            builder.Property(m => m.StartDate)
              .IsRequired();

            builder.Property(m => m.EndDate)
              .IsRequired();

            builder.Property(m => m.NumberOfDate)
              .IsRequired();

            builder.Property(m => m.TimeStamp)
              .IsRequired();

            builder.Property(m => m.Description)
              .HasMaxLength(255);


        }
    }
}
