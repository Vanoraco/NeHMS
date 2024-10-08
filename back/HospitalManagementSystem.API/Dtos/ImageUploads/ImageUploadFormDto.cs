using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HospitalManagementSystem.API.Dtos.Cases
{
    public class ImageUploadFormDto
    {
        [Required]
        public int PatientId { get; set; }
        [Required]
        [MaxLength(50)]
        public string ImageUrls { get; set; }

    }
}
