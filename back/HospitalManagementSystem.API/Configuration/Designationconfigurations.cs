using HospitalManagementSystem.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HospitalManagementSystem.API.Configuration
{
    public class Designationconfigurations : IEntityTypeConfiguration<Designation>
    {
    
public void Configure(EntityTypeBuilder<Designation> builder)
        {
            builder.Property(dg => dg.Name)
                .IsRequired()
                .HasMaxLength(50);

            builder.Property(dg => dg.Description)
                .HasMaxLength(255);
        }
    }
}
