using System;

namespace HospitalManagementSystem.API.Models
{
    public class MedicalInterviewSocrates
    {
        public int Id { get; set; }
        public Patient  Patient{ get; set; }
        public int PatientId { get; set; }
        public string PainOnSetSide { get; set; }
        public string PainOnSetSuddenGradual{ get; set; }
        public string PainOnSetProgressiveRgressive { get; set; }
        public DateTime PainOnSetSideDuration { get; set; }
        public string PainCharacteristics{ get; set; }
        public string PainRadiation { get; set; }
        public string PainAssociation { get; set; }
        public int PainTimeCourse{ get; set; }
        public string PainExacerbatingRelivingFactor{ get; set; }
        public string PainSeverity { get; set; }



    }
}
