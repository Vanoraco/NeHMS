using HospitalManagementSystem.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HospitalManagementSystem.API.Configuration
{
    public class MedicalHistoryFamilyConfigurations : IEntityTypeConfiguration<MedicalHistoryFamily>
    {
        public void Configure(EntityTypeBuilder<MedicalHistoryFamily> builder)
        {
            builder.Property(m=> m.Id)
                .IsRequired();

            builder.Property(m => m.PatientId)
                .IsRequired();

            builder.Property(m => m.FamilyDisease)
               .IsRequired();

            builder.Property(m => m.DeceasedFamily)
               .IsRequired();

            builder.Property(m => m.Description)
               .HasMaxLength(255);

        }
    }
}
