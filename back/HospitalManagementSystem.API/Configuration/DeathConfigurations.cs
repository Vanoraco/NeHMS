using HospitalManagementSystem.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HospitalManagementSystem.API.Configuration
{
    public class DeathConfigurations : IEntityTypeConfiguration<Death>
    {
        public void Configure(EntityTypeBuilder<Death> builder)
        {
            builder.Property(D => D.EmployeeId)
               .IsRequired();
              

            builder.Property(D => D.PatientId)
                  .IsRequired();
        }
    }
}
