using System;

namespace HospitalManagementSystem.API.Models
{
    public class Revenue
    {
        public int Id { get; set; }
        public RevenueCategory RevenueCategory { get; set; }
        public int RevenueCategoryId { get; set; }
        public float Amount { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
    }
}
