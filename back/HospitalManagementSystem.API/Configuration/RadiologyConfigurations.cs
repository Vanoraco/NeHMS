using HospitalManagementSystem.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HospitalManagementSystem.API.Configuration
{
    public class RadiologyConfigurations : IEntityTypeConfiguration<Radiology>
    {
        public void Configure(EntityTypeBuilder<Radiology> builder)
        {
            builder.Property(radiology => radiology.Id)
                .IsRequired()
                .HasMaxLength(50);
            builder.Property(radiology => radiology.AdmissionId)
              .IsRequired()
              .HasMaxLength(50);
            builder.Property(radiology => radiology.OrderedDate)
              .IsRequired()
              .HasMaxLength(50);
            builder.Property(radiology => radiology.LaboratoryTestCategoryId)
              .IsRequired()
              .HasMaxLength(50);
            builder.Property(radiology => radiology.Remark)
              .HasMaxLength(50);
            builder.Property(radiology => radiology.Priority)
              .IsRequired()
              .HasMaxLength(50);
            builder.Property(radiology => radiology.IsCancelled)
              .IsRequired()
              .HasMaxLength(50);
            builder.Property(radiology => radiology.IsPaid)
                .HasDefaultValue(false);
            builder.Property(radiology => radiology.EmployeeId)
              .IsRequired()
              .HasMaxLength(50);
        }
    }
}
