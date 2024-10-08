using HospitalManagementSystem.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HospitalManagementSystem.API.Configuration
{
    public class PharmacyExpenseCatagoryConfigurations : IEntityTypeConfiguration<PharmacyExpenseCatagory>
    {
        public void Configure(EntityTypeBuilder<PharmacyExpenseCatagory> builder)
        {
            builder.Property(pec => pec.Id)
               .IsRequired()
               .HasMaxLength(50);
            builder.Property(a => a.catagory)
                 .IsRequired()
               .HasMaxLength(50);
            builder.Property(a => a.Description)
              .HasMaxLength(50);

        }
    }
}
