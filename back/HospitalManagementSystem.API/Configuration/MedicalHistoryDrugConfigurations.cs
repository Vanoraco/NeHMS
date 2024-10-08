using HospitalManagementSystem.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HospitalManagementSystem.API.Configuration
{
    public class MedicalHistoryDrugConfigurations : IEntityTypeConfiguration<MedicalHistoryDrug>
    {
        public void Configure(EntityTypeBuilder<MedicalHistoryDrug> builder)
        {
            builder.Property(mh => mh.Id)
                .IsRequired();

            builder.Property(mh => mh.patientId)
                .IsRequired();

            builder.Property(mh => mh.PostMedication)
               .IsRequired()
               .HasMaxLength(255);

            builder.Property(mh => mh.RecratioalDrug)
               .IsRequired()
               .HasMaxLength(255);

            builder.Property(mh => mh.IntravenousDrug)
               .IsRequired()
               .HasMaxLength(255);

            builder.Property(mh => mh.OtcDrug)
               .IsRequired()
               .HasMaxLength(255);
        }
    }
}
