using System.ComponentModel.DataAnnotations;

namespace HospitalManagementSystem.API.Dtos.Inventory
{
    public class InventorySupplyUpdateDto
    {
        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        [StringLength(50)]
        public string Description { get; set; }

        [Required]
        [StringLength(50)]
        public string Address { get; set; }

        [Required]
        [Range(0, int.MaxValue)]
        public int PhoneNumber { get; set; }
    }
}
