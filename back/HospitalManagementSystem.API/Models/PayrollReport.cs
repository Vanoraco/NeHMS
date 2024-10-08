using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace HospitalManagementSystem.API.Models
{
    public class PayrollReport
    {
        public int Id { get; set; }
        public float BaseSalary { get; set; }
        public DateTime Date { get; set; }
        public DateTime Month { get; set; }
        public DateTime Year { get; set; }
        
        public int EmployeeId { get; set; }
        public EmployeeSalary EmployeeSalary { get; set; }
        public int EmployeeSalaryId { get; set; }
        public ICollection<Employee> Employees { get; set; }
       
    }
}
