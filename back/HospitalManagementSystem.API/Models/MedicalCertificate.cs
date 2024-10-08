using System;
using HospitalManagementSystem.API.Models.Base;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;

namespace HospitalManagementSystem.API.Models
{
    public class MedicalCertificate
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime TimeStamp { get; set; }
        public DateTime NumberOfDate { get; set; }
        public Employee Employee { get; set; }
        public int EmployeeId { get; set; }

    }
}
