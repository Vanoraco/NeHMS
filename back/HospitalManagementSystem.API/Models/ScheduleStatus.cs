using HospitalManagementSystem.API.Models.Base;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace HospitalManagementSystem.API.Models
{
    public class ScheduleStatus: BaseModel 
    {
        public ICollection<PatientSchedule> PatientSchedules { get; set; }



        public ScheduleStatus()
        {
            PatientSchedules = new Collection<PatientSchedule>();
        }

        }
}
