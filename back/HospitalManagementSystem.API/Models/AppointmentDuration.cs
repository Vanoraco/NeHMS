using HospitalManagementSystem.API.Models.Base;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;

namespace HospitalManagementSystem.API.Models
{
    public class AppointmentDuration : BaseModel
    {
        public ICollection<Schedule> Schedules { get; set; }
        public ICollection<PatientSchedule> PatientSchedules { get; set; }

        public AppointmentDuration()
        {
            PatientSchedules = new Collection<PatientSchedule>();
            Schedules = new Collection<Schedule>();

        }
    }
}
