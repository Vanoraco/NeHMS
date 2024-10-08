using HospitalManagementSystem.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HospitalManagementSystem.API.Configuration
{
    public class AllowanceDeductionTypeConfigurations
        : IEntityTypeConfiguration<AllowanceDeductionType>
    {
        public void Configure(EntityTypeBuilder<AllowanceDeductionType> builder)
        {
            builder.Property(a => a.Id).IsRequired();
            builder.Property(a => a.Name).IsRequired().HasMaxLength(15);
            builder.Property(a => a.Description).HasMaxLength(255);
            builder.Property(a => a.Type).IsRequired();
        }
    }
}
