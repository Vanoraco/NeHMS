using System;

namespace HospitalManagementSystem.API.Models
{
    public class PharmacySale
    {
        public int Id { get; set; }
        public string description  { get; set; }
        public int Amount { get; set; }
        public float Price { get; set; }
        public DateTime TimeStamp { get; set; }
        public PharmacyMedStock PharmacyMedStock { get; set; }
        public int PharmacyMedStockId { get; set; }
        public Employee Employee { get; set; }
        public int EmployeeId { get; set; }

    }
}
