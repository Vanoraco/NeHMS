using HospitalManagementSystem.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HospitalManagementSystem.API.Configuration
{
    public class PharmacySaleConfigurations : IEntityTypeConfiguration<PharmacySale>
    {
        public void Configure(EntityTypeBuilder<PharmacySale> builder)
        {
            builder.Property(ps => ps.Amount)
                 .IsRequired();
            builder.Property(ps => ps.Price)
                .IsRequired();
            builder.Property(ps => ps.PharmacyMedStockId)
                .IsRequired();
            builder.Property(ps => ps.EmployeeId)
                .IsRequired();
           



        }
    }
}
