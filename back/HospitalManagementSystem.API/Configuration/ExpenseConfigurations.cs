using HospitalManagementSystem.API.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace HospitalManagementSystem.API.Configuration
{
    public class ExpenseConfigurations : IEntityTypeConfiguration<Expense>
    {
        public void Configure(EntityTypeBuilder<Expense> builder)
        {
            builder.Property(e => e.Id)
             .IsRequired();

            builder.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(50);

            builder.Property(e => e.Description)
                .HasMaxLength(255);

            builder.Property(e => e.Amount)
             .IsRequired();

            builder.Property(e => e.Date)
             .IsRequired();

            builder.Property(e => e.ExpenseCatagoryId)
             .IsRequired();
        }
    }
   
}
