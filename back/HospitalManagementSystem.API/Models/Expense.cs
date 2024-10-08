using HospitalManagementSystem.API.Models.Base;
using System;

namespace HospitalManagementSystem.API.Models
{
    public class Expense : BaseModel
    {
        public ExpenseCatagory ExpenseCatagory { get; set; }

        public int ExpenseCatagoryId { get; set; }
        public float Amount { get; set; }
        public DateTime Date { get; set; }
    }
}
