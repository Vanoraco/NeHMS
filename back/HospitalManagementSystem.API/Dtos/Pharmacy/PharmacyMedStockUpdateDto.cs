using System;
using System.ComponentModel.DataAnnotations;

namespace HospitalManagementSystem.API.Dtos.Pharmacy
{
    public class PharmacyMedStockUpdateDto
    {
        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        [StringLength(225)]
        public string Description { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int MedicationId { get; set; }

        [Required]
        [StringLength(50)]
        public string BatchNumber { get; set; }

        [Required]
        public DateTime ExpirationDate { get; set; }

        [Required]
        [Range(0.01, double.MaxValue)]
        public float Price { get; set; }

        [Required]
        [Range(0, int.MaxValue)]
        public int Quantity { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int EmployeeId { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int MedSupplierId { get; set; }

        public DateTime TimeStamp { get; set; }
    }
}
