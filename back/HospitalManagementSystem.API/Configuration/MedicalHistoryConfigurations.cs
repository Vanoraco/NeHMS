using HospitalManagementSystem.API.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace HospitalManagementSystem.API.Configuration
{
    public class MedicalHistoryConfigurations : IEntityTypeConfiguration<MedicalHistory>
    {
        public void Configure(EntityTypeBuilder<MedicalHistory> builder)
        {
            builder.Property(mh => mh.Id)
             .IsRequired();
            builder.Property(mh => mh.PatientId)
             .IsRequired();
            builder.Property(mh => mh.Disease)
             .IsRequired();
            builder.Property(mh => mh.Treatment)
             .IsRequired();
            builder.Property(mh => mh.RiskFactor)
             .IsRequired();
            builder.Property(mh => mh.Description)
             .IsRequired();
        }
    }
    }