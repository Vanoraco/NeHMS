using System;

namespace HospitalManagementSystem.API.Models
{
    public class MedicalInterviewAllergy
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public Allergy Allergy { get; set; }
        public int AllergyId { get; set; }
        public Patient Patient { get; set; }
        public int PatientId { get; set; }
        public string ThroatSwelling { get; set; }
        public string PuffFace { get; set; }
        public string TroubleBreathing { get; set; }
        public string Other { get; set; }
    }
}
