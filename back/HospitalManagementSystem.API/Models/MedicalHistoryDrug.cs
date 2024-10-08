using System;

namespace HospitalManagementSystem.API.Models
{
    public class MedicalHistoryDrug
    {
        public int Id { get; set; }
        public string Symptom { get; set; }
        public Patient Patient { get; set; }
        public int patientId { get; set; }
        public string PostMedication { get; set; }
        public string RecratioalDrug { get; set; }
        public string IntravenousDrug  { get; set; }
        public string OtcDrug { get; set; }
    }
}
