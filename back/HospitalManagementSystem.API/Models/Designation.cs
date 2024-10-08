using HospitalManagementSystem.API.Models.Base;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace HospitalManagementSystem.API.Models
{
    public class Designation : BaseModel
    {
        public ICollection<Employee> Employess { get; set; }

        public Designation()
        {
            Employess = new Collection<Employee>();
        }

    }
}
