using System;
using System.ComponentModel.DataAnnotations;

namespace HospitalManagementSystem.API.Dtos.Pharmacy
{
    public class PharmacySaleUpdateDto
    {
        [StringLength(50)]
        public string Description { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int Amount { get; set; }

        [Required]
        [Range(0.01, double.MaxValue)]
        public float Price { get; set; }

        public DateTime TimeStamp { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int PharmacyMedStockId { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int EmployeeId { get; set; }
    }
}
