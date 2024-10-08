using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace HospitalManagementSystem.API.Models
{
    public class RevenueCategory
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public ICollection<Revenue> Revenues { get; set; }
        public RevenueCategory()
        {
            Revenues = new Collection<Revenue>();
        }
    }
}
