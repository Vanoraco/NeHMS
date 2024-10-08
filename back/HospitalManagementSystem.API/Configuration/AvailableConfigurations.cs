using HospitalManagementSystem.API.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace HospitalManagementSystem.API.Configuration
{
    public class AvailableConfigurations:IEntityTypeConfiguration<Available>
    {
        
            public void Configure(EntityTypeBuilder<Available> builder)
            {
                builder.Property(at => at.Id)
                  .IsRequired();
                  
                builder.Property(at => at.Name)
                  .IsRequired()
                  .HasMaxLength(15);

                builder.Property(at => at.Description)
                  .HasMaxLength(255);
        }
        }
    }

