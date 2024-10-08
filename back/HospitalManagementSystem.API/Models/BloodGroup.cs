using HospitalManagementSystem.API.Models.Base;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;

namespace HospitalManagementSystem.API.Models
{
    public class BloodGroup : BaseModel
    {
        public BloodGroupStatus BloodGroupStatus { get; set; }
        public int BloodGroupStatusId { get; set; }
        public ICollection<Donor> Donors { get; set; }
        public ICollection<Patient> Patients { get; set; }

        public BloodGroup()
        {
            Patients = new Collection<Patient>();
            Donors = new Collection<Donor>();
        }
    }
}
