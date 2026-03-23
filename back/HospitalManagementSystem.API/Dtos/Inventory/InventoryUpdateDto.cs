using System;
using System.ComponentModel.DataAnnotations;

namespace HospitalManagementSystem.API.Dtos.Inventory
{
    public class InventoryUpdateDto
    {
        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        [StringLength(50)]
        public string Description { get; set; }

        [Required]
        [Range(0, int.MaxValue)]
        public int Quantity { get; set; }

        [Required]
        public DateTime ExpireDate { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int InventorySupplyId { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int EmployeeId { get; set; }

        [Required]
        public DateTime Date { get; set; }
    }
}
