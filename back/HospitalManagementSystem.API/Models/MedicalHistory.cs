using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace HospitalManagementSystem.API.Models
{
    public class MedicalHistory
    {
        public int Id { get; set; }
        public Patient Patient { get; set; }
        public int PatientId { get; set; }
        public string Disease { get; set; }
        public string Treatment { get; set; }
        public string RiskFactor { get; set; }
        public string Description { get; set; }
        
    }
}
