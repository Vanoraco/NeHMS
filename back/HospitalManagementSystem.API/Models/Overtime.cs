using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace HospitalManagementSystem.API.Models
{
    public class Overtime
    {
        public int Id { get; set; }
        public Employee Employee { get; set; }
        public int EmployeeId { get; set; }
        public float Hours { get; set; }
        public DateTime Date { get; set; }
        public float FixedAmount { get; set; }
       

    }
}
