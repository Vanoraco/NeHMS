using HospitalManagementSystem.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HospitalManagementSystem.API.Configuration
{
    public class BloodGroupStatusConfigurations : IEntityTypeConfiguration<BloodGroupStatus>
    {
        public void Configure(EntityTypeBuilder<BloodGroupStatus> builder)
        {
            builder.Property(bs => bs.Status)
                .IsRequired()
                .HasDefaultValue(0);
                
        }
    }
}
