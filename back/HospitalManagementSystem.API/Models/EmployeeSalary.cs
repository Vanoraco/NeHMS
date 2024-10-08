using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace HospitalManagementSystem.API.Models
{
    public class EmployeeSalary
    {
        public int Id { get; set; }
        public float Salary { get; set; }
        public Employee Employee { get; set; }
        public int EmployeeId { get; set; }
        public ICollection<PayrollReport> PayrollReports { get; set; }
        public EmployeeSalary()
        {
            PayrollReports = new Collection<PayrollReport>();
        }

    }
   
}
