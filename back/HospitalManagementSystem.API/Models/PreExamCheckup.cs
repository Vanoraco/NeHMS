using System;

namespace HospitalManagementSystem.API.Models
{
    public class PreExamCheckup
    {
        public int Id { get; set; }
        public string Symptom { get; set; }
        public Employee Employee { get; set; }
        public int EmployeeId { get; set; }
        public Admission Admission { get; set; }
        public int AdmissionId { get; set; }
        public float Height { get; set; }
        public float Weight { get; set; }
        public string Pain { get; set; }
        public string Severity { get; set; }
        public string BP { get; set; }

    }
}
