using HospitalManagementSystem.API.Models.Base;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;

namespace HospitalManagementSystem.API.Models
{
    public class Specialization:BaseModel
    {
        public ICollection<Employee> Employess { get; set; }

        public Specialization()
        {
            Employess = new Collection<Employee>();
        }
    }
}
