using HospitalManagementSystem.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HospitalManagementSystem.API.Configuration
{
    public class AllowanceDeductionConfigurations : IEntityTypeConfiguration<AllowanceDeduction>
    {
        public void Configure(EntityTypeBuilder<AllowanceDeduction> builder)
        {
            builder.Property(a => a.Id).IsRequired();
            builder.Property(a => a.EmployeeId).IsRequired();
            builder.Property(a => a.AllowanceDeductionTypeId).IsRequired();
            builder.Property(a => a.Month).IsRequired();
            builder.Property(a => a.Year).IsRequired();
            builder.Property(a => a.FixedAmount).IsRequired();
        }
    }
}
