using HospitalManagementSystem.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HospitalManagementSystem.API.Configuration
{
    public class PreExamCheckupConfigurations : IEntityTypeConfiguration<PreExamCheckup>
    {
        public void Configure(EntityTypeBuilder<PreExamCheckup> builder)
        {
            builder.Property(p => p.Id)
              .IsRequired();

            builder.Property(p => p.EmployeeId)
               .IsRequired();

            builder.Property(p => p.AdmissionId)
              .IsRequired();

            builder.Property(p => p.Symptom)
              .IsRequired();

            builder.Property(p => p.Pain)
              .IsRequired();

            builder.Property(p =>p.BP )
              .IsRequired();

            builder.Property(p => p.Severity)
              .IsRequired();

            builder.Property(p => p.Weight)
              .IsRequired();

        }
    }
}
