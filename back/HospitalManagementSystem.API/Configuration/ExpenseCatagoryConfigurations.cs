using HospitalManagementSystem.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HospitalManagementSystem.API.Configuration
{
    public class ExpenseCatagoryConfigurations : IEntityTypeConfiguration<ExpenseCatagory>
    {
        public void Configure(EntityTypeBuilder<ExpenseCatagory> builder)
        {
            builder.Property(ex => ex.Id)
             .IsRequired();

            builder.Property(ex => ex.Name)
                .IsRequired()
                .HasMaxLength(50);

            builder.Property(ex => ex.Description)
                .HasMaxLength(255);
        }
    }
}
