using HospitalManagementSystem.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HospitalManagementSystem.API.Configuration
{
    public class ImageUploadConfigurations : IEntityTypeConfiguration<Image>
    {
        public void Configure(EntityTypeBuilder<Image> builder)
        {
            builder.Property(c => c.Id)
                 .IsRequired();
            builder.Property(c => c.PatientId)
                .IsRequired();
            builder.Property(c => c.ImageUrl)
                .IsRequired();
        }
    }
}
