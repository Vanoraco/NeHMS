using System;

namespace HospitalManagementSystem.API.Models
{
    public class PharmacyExpense
    {
        public int Id { get; set; }
        public PharmacyExpenseCatagory PharmacyExpenseCatagory { get; set; }
        public int PharmacyExpenseCatagoryId { get; set; }
        public int Amount { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
    }
}
