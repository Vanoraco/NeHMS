using System;

namespace HospitalManagementSystem.API.Models
{
    public class AllowanceDeduction
    {
        public int Id { get; set; }
        public DateTime Month { get; set; }
        public DateTime Year { get; set; }
        public float FixedAmount { get; set; }
        public Employee Employee{ get; set; }
        public int EmployeeId{ get; set; }
        public AllowanceDeductionType AllowanceDeductionType{ get; set; }
        public int AllowanceDeductionTypeId { get; set; }


    }
}
