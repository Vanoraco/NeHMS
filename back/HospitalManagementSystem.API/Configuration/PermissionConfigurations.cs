using HospitalManagementSystem.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HospitalManagementSystem.API.Configuration
{
    public class PermissionConfigurations : IEntityTypeConfiguration<Permission>
    {
        public void Configure(EntityTypeBuilder<Permission> builder)
        {
            builder.Property(pe => pe.Name)
                .IsRequired()
                .HasMaxLength(100);
            builder.Property(pe => pe.Description)
                 .HasMaxLength(250);
        }
    
}
}
