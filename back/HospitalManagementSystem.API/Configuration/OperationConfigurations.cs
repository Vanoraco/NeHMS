using HospitalManagementSystem.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HospitalManagementSystem.API.Configuration
{
    public class OperationConfigurations : IEntityTypeConfiguration<Operation>
    {
        public void Configure(EntityTypeBuilder<Operation> builder)
        {
            builder.Property(o => o.EmployeeId)
               .IsRequired();
               

            builder.Property(o=> o.PatientId)
               .IsRequired();
        }
    }
}
