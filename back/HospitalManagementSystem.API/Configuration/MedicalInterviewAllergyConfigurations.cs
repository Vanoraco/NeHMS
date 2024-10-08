using HospitalManagementSystem.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HospitalManagementSystem.API.Configuration
{
    public class MedicalInterviewAllergyConfigurations : IEntityTypeConfiguration<MedicalInterviewAllergy>
    {
        public void Configure(EntityTypeBuilder<MedicalInterviewAllergy> builder)
        {
            builder.Property(ma => ma.Id)
             .IsRequired();

            builder.Property(ma => ma.PatientId)
                .IsRequired();

            builder.Property(ma => ma.AllergyId)
                .IsRequired();

            builder.Property(ma => ma.Description)
                .HasMaxLength(255);

            builder.Property(ma => ma.ThroatSwelling)
                .HasMaxLength(255);

            builder.Property(ma => ma.TroubleBreathing)
                .HasMaxLength(255);

            builder.Property(ma => ma.PuffFace)
                .HasMaxLength(255);

            builder.Property(ma => ma.Other)
                .HasMaxLength(255);
        }
    }
}
