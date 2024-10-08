using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace HospitalManagementSystem.API.Models
{
    public class BillSchedule
    {
        public int Id { get; set; }
        public PatientSchedule PatientSchedule { get; set; }

        public int PatientScheduleId{ get; set; }

        public ServiceCharge ServiceCharge { get; set; }
        public int ServiceChargeId { get; set; }

        public DateTime Date  { get; set; }
        public Employee Employee { get; set; }

        public int EmployeeId { get; set; }

       


    }
}
