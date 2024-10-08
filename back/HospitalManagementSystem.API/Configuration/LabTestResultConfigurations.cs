using HospitalManagementSystem.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HospitalManagementSystem.API.Configuration
{
    public class LabTestResultConfigurations: IEntityTypeConfiguration<LabTestResult>
    {
        public void Configure(EntityTypeBuilder<LabTestResult> builder)
        {
            builder.Property(a => a.Id)
               .IsRequired();
            builder.Property(a => a.Name)
                .IsRequired()
                .HasMaxLength(50); 
            builder.Property(a => a.Result)
                .IsRequired()
                .HasMaxLength(50);
            builder.Property(a => a.Description)
                .HasMaxLength(255);
            builder.Property(a => a.LaboratoryTestTypeId)
                .IsRequired();
            builder.Property(a => a.LabRequestId)
                .IsRequired();
        }

    }
}
