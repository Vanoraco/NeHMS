using HospitalManagementSystem.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HospitalManagementSystem.API.Configuration
{
    public class NotificationConfigurations : IEntityTypeConfiguration<Notification>
    {
        public void Configure(EntityTypeBuilder<Notification> builder)
        {
            builder.Property(nt => nt.Id)
                .IsRequired();
            builder.Property(nt => nt.Title)
                .IsRequired()
                .HasMaxLength(50);
            builder.Property(nt => nt.Status)
                .IsRequired();
            builder.Property(nt => nt.EmployeeId)
                .IsRequired();
            builder.Property(nt => nt.Date)
                .IsRequired();
            builder.Property(at => at.Description)
                .HasMaxLength(255);
        }
    }
}
