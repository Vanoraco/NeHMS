using HospitalManagementSystem.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HospitalManagementSystem.API.Configuration
{
    public class BedAllotmentConfigurations : IEntityTypeConfiguration<BedAllotment>
    {
        public void Configure(EntityTypeBuilder<BedAllotment> builder)
        {
            builder.Property(b => b.Id)
               .IsRequired();
            builder.Property(B => B.BedId)
               .IsRequired();
            builder.Property(B => B.PatientId)
               .IsRequired();
            builder.Property(B => B.AllotedDate)
               .IsRequired();
            builder.Property(B => B.DiscourageDate)
               .IsRequired();

        }
    }
}
