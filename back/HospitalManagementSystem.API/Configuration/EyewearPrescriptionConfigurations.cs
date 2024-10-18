using HospitalManagementSystem.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HospitalManagementSystem.API.Configuration
{
    public class EyewearPrescriptionConfigurations : IEntityTypeConfiguration<EyewearPrescription>
    {
        public void Configure(EntityTypeBuilder<EyewearPrescription> builder)
        {
            // Configure prescription properties
            builder.Property(ep => ep.RightEyeSphDistant).IsRequired();
            builder.Property(ep => ep.RightEyeCylDistant).IsRequired();
            builder.Property(ep => ep.RightEyeAxisDistant).IsRequired();
            builder.Property(ep => ep.RightEyeSphClose).IsRequired();
            builder.Property(ep => ep.RightEyeCylClose).IsRequired();
            builder.Property(ep => ep.RightEyeAxisClose).IsRequired();
            builder.Property(ep => ep.LeftEyeSphDistant).IsRequired();
            builder.Property(ep => ep.LeftEyeCylDistant).IsRequired();
            builder.Property(ep => ep.LeftEyeAxisDistant).IsRequired();
            builder.Property(ep => ep.LeftEyeSphClose).IsRequired();
            builder.Property(ep => ep.LeftEyeCylClose).IsRequired();
            builder.Property(ep => ep.LeftEyeAxisClose).IsRequired();
            builder.Property(ep => ep.Far).IsRequired();
            builder.Property(ep => ep.Near).IsRequired();

            // Configure checkbox fields with default values
            builder.Property(ep => ep.PhotoSolar).IsRequired().HasDefaultValue(false);
            builder.Property(ep => ep.Bifocal).IsRequired().HasDefaultValue(false);
            builder.Property(ep => ep.Progressive).IsRequired().HasDefaultValue(false);
            builder.Property(ep => ep.ScratchResistant).IsRequired().HasDefaultValue(false);
            builder.Property(ep => ep.ResinPlastic).IsRequired().HasDefaultValue(false);
            builder.Property(ep => ep.GlareFree).IsRequired().HasDefaultValue(false);
            builder.Property(ep => ep.HiIndex).IsRequired().HasDefaultValue(false);

            // Configure relationships

            builder.HasOne(ep => ep.Patient)
                .WithMany() 
                .HasForeignKey(ep => ep.PatientId)
                .OnDelete(DeleteBehavior.NoAction); // Restrict cascading delete

            builder.HasOne(ep => ep.Employee)
                .WithMany() 
                .HasForeignKey(ep => ep.EmployeeId)
                .OnDelete(DeleteBehavior.NoAction); // No action on delete to avoid cascade issues

            builder.HasOne(ep => ep.Admission)
                .WithMany() 
                .HasForeignKey(ep => ep.AdmissionId)
                .OnDelete(DeleteBehavior.NoAction); // Restrict cascading delete

            // Additional properties
            builder.Property(ep => ep.OrderDate).IsRequired(); // OrderDate is required
            builder.Property(ep => ep.IsCancelled).HasDefaultValue(false); // Default value for IsCancelled is false
        }
    }
}
