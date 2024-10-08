using HospitalManagementSystem.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HospitalManagementSystem.API.Configuration
{
    public class EmployeeSalaryConfigurations : IEntityTypeConfiguration<EmployeeSalary>
    {
        public void Configure(EntityTypeBuilder<EmployeeSalary> builder)
        {
            builder.Property(ef => ef.Id)
                .IsRequired();

            builder.Property(ef => ef.EmployeeId)
                .IsRequired();

            builder.Property(ef => ef.Salary)
                .IsRequired();
                


        }
    }
}
