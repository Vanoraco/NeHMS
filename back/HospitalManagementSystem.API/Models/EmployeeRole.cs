using System.Collections.Generic;
using System.Collections.ObjectModel;
using HospitalManagementSystem.API.Models.Base;

namespace HospitalManagementSystem.API.Models
{
    public class EmployeeRole : BaseModel
    {
        public string Permission { get; set; }
        public ICollection<Employee> Employees { get; set; }

        public EmployeeRole()
        {
            Employees = new Collection<Employee>();
        }
    }
}
