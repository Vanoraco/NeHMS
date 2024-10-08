using HospitalManagementSystem.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HospitalManagementSystem.API.Configuration
{
    public class PharmacyExpenseConfigurations : IEntityTypeConfiguration<PharmacyExpense>
    {
        public void Configure(EntityTypeBuilder<PharmacyExpense> builder)
        {
            builder.Property(pe => pe.Id)
                .IsRequired()
                .HasMaxLength(50);
            builder.Property(pe => pe.PharmacyExpenseCatagoryId)
                .IsRequired()
                .HasMaxLength(50);
            builder.Property(pe => pe.Amount)
               .IsRequired()
               .HasMaxLength(50);
            builder.Property(pe => pe.Date)
               .IsRequired();
            builder.Property(pe => pe.Description)
               .IsRequired()
               .HasMaxLength(50);

        }
    }
    }