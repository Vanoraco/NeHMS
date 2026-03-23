using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace HospitalManagementSystem.API.Models
{
    public class InventorySupply
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Address { get; set; }
        public int PhoneNumber { get; set; }

        public ICollection<Inventory> Inventories { get; set; }
        public InventorySupply()
        {
            Inventories = new Collection<Inventory>();
        }
    }
}
