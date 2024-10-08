using System;

namespace HospitalManagementSystem.API.Models
{
    public class Death
    {
        public int Id { get; set; }
        public string Description  { get; set; }
        public Employee Employee { get; set; }
        public int EmployeeId { get; set; }
        public Patient Patient { get; set; }
        public int PatientId { get; set; }
        public DateTime Date { get; set; }
    }
}
