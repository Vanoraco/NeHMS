using HospitalManagementSystem.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HospitalManagementSystem.API.Configuration
{
    public class BirthConfigurations : IEntityTypeConfiguration<Birth>
    {
        public void Configure(EntityTypeBuilder<Birth> builder)
        {
            builder.Property(b => b.Id)
                .IsRequired()
                .HasMaxLength(50);
            builder.Property(b => b.EmployeeId)
               .IsRequired()
               .HasMaxLength(50);
            builder.Property(b => b.Description)
              .IsRequired()
              .HasMaxLength(50);
            builder.Property(b => b.PatientId)
              .IsRequired()
              .HasMaxLength(50);
            builder.Property(b => b.Date)
              .IsRequired()
              .HasMaxLength(50);
            builder.Property(b => b.ChildGender)
              .IsRequired()
              .HasMaxLength(50);
        }
    }
}
