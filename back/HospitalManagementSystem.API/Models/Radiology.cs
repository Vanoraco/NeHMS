using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace HospitalManagementSystem.API.Models
{
    public class Radiology
    {
        public int Id { get; set; }
        public Admission Admission { get; set; }
        public int AdmissionId { get; set; }
        public DateTime OrderedDate { get; set; }
        public LaboratoryTestCategory LaboratoryTestCategory { get; set; }
        public int LaboratoryTestCategoryId { get; set; }
        public Employee Employee { get; set; }
        public int EmployeeId { get; set; }
        public string Remark { get; set; }
        public string Priority { get; set; }
        public bool IsCancelled { get; set; }
        public bool IsPaid { get; set; } = false;
    }
}
