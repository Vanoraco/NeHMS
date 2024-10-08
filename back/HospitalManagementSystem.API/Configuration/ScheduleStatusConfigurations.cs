using Microsoft.EntityFrameworkCore;
using HospitalManagementSystem.API.Models;

namespace HospitalManagementSystem.API.Configuration
{
    public class ScheduleStatusConfigurations : IEntityTypeConfiguration<ScheduleStatus>
    {
        public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<ScheduleStatus> builder)
        {
            builder.Property(ss => ss.Name)
               .IsRequired();
             
        }
    }
}
