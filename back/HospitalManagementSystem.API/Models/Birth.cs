using System;

namespace HospitalManagementSystem.API.Models
{
    public class Birth
    {
        public int Id { get; set; }
        public Employee Employee { get; set; }
        public int EmployeeId { get; set; }
        public string Description { get; set; }
        public Patient Patient { get; set; }
        public int PatientId { get; set; }
        public DateTime Date { get; set; }
        public int ChildGender { get; set; }
     }

    }
