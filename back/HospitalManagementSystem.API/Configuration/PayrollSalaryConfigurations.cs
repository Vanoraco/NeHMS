using HospitalManagementSystem.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HospitalManagementSystem.API.Configuration
{
    public class PayrollSalaryConfigurations : IEntityTypeConfiguration<PayrollReport>
    {
        public void Configure(EntityTypeBuilder<PayrollReport> builder)
        {
            builder.Property(pr => pr.Id)
               .IsRequired();

            builder.Property(pr => pr.EmployeeSalaryId)
              .IsRequired();

            builder.Property(pr => pr.EmployeeId)
              .IsRequired();

            builder.Property(pr => pr.Date)
              .IsRequired();

            builder.Property(pr => pr.Month)
              .IsRequired();

            builder.Property(pr => pr.Year)
              .IsRequired();

            builder.Property(pr => pr.BaseSalary)
              .IsRequired();

        }
    }
}
