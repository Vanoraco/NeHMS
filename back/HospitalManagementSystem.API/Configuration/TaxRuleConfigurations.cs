using HospitalManagementSystem.API.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace HospitalManagementSystem.API.Configuration
{
    public class TaxRuleConfigurations : IEntityTypeConfiguration<TaxRule>
    {
        public void Configure(EntityTypeBuilder<TaxRule> builder)
        {
            builder.Property(tr => tr.Id)
                .IsRequired()
                .HasMaxLength(50);
            builder.Property(tr => tr.ToSalary)
                .IsRequired()
                .HasMaxLength(50);
            builder.Property(tr => tr.FromSalary)
                .IsRequired()
                .HasMaxLength(50);
            builder.Property(tr => tr.percentageAmount)
                .IsRequired()
                .HasMaxLength(50); 
            builder.Property(tr => tr.deduction)
                .IsRequired()
                .HasMaxLength(50);
        }
    }
}
