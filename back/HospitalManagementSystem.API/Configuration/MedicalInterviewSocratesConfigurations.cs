using HospitalManagementSystem.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HospitalManagementSystem.API.Configuration
{
    public class MedicalInterviewSocratesConfigurations : IEntityTypeConfiguration<MedicalInterviewSocrates>
    {
        public void Configure(EntityTypeBuilder<MedicalInterviewSocrates> builder)
        {
            builder.Property(m => m.Id)
                 .IsRequired();


            builder.Property(m => m.PatientId)
                .IsRequired();


            builder.Property(m => m.PainOnSetSide)
                .IsRequired();

            builder.Property(m => m.PainOnSetSideDuration)
                .IsRequired();
            builder.Property(m => m.PainOnSetSuddenGradual)
                .IsRequired();
            builder.Property(m => m.PainOnSetProgressiveRgressive)
                .IsRequired();
            builder.Property(m => m.PainCharacteristics)
                .IsRequired();
            builder.Property(m => m.PainRadiation)
                .IsRequired();
            builder.Property(m => m.PainAssociation)
                .IsRequired();
            builder.Property(m => m.PainTimeCourse)
                .IsRequired();
            builder.Property(m => m.PainExacerbatingRelivingFactor)
                .IsRequired();
            builder.Property(m => m.PainSeverity)
                .IsRequired();






        }
    }
}
