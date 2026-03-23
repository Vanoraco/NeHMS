using System;
using System.ComponentModel.DataAnnotations;

namespace HospitalManagementSystem.API.Dtos.Pharmacy
{
    public class PharmacyExpenseCreateDto
    {
        [Required]
        [Range(1, int.MaxValue)]
        public int PharmacyExpenseCatagoryId { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int Amount { get; set; }

        [Required]
        [StringLength(50)]
        public string Description { get; set; }

        [Required]
        public DateTime Date { get; set; }
    }
}
