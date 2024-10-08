using HospitalManagementSystem.API.Dtos.EmployeeAuth;
using HospitalManagementSystem.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HospitalManagementSystem.API.Configuration
{
    public class EmployeeAuthConfigurations : IEntityTypeConfiguration<EmployeeAuthDisplayDto>
    {
        public void Configure(EntityTypeBuilder<EmployeeAuthDisplayDto> builder)
        {
            builder.Property(at => at.EmailAddress)
                .IsRequired()
                .HasMaxLength(50);

            builder.Property(at => at.Password)
                .HasMaxLength(50);

            
        }
    
    }
}
