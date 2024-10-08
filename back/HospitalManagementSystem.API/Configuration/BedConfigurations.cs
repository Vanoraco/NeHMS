using HospitalManagementSystem.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HospitalManagementSystem.API.Configuration
{
    public class BedConfigurations : IEntityTypeConfiguration<Bed>

    {
        public void Configure(EntityTypeBuilder<Bed> builder)
        {
            builder.Property(b => b.Id)
               .IsRequired();
            builder.Property(B => B.BedTypeId)
               .IsRequired();
            builder.Property(B => B.WardId)
               .IsRequired();
            builder.Property(B => B.AvailableId)
               .IsRequired();
            builder.Property(b => b.Name)
                .IsRequired();
            builder.Property(b => b.Description)
                .HasMaxLength(255);
            builder.Property(b => b.Code)
                .HasMaxLength(255);
            


        }
    }
}
