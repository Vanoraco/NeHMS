using HospitalManagementSystem.API.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace HospitalManagementSystem.API.Configuration
{
    public class OvertimeConfigurations : IEntityTypeConfiguration<Overtime>
    {
        public void Configure(EntityTypeBuilder<Overtime> builder)
        {
            builder.Property(ot => ot.Id)
                .IsRequired()
                .HasMaxLength(50);
            builder.Property(ot => ot.EmployeeId)
               .IsRequired()
               .HasMaxLength(50);
            builder.Property(ot => ot.Hours)
               .IsRequired()
               .HasMaxLength(50);
            builder.Property(ot => ot.Date)
               .IsRequired()
               .HasMaxLength(50);
            builder.Property(ot => ot.FixedAmount)
               .IsRequired()
               .HasMaxLength(50);
        }
    }
}
