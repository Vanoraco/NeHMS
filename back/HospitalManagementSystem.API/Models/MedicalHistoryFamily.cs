namespace HospitalManagementSystem.API.Models
{
    public class MedicalHistoryFamily
    {
        public int Id { get; set; }
        public Patient Patient{ get; set; }
        public int PatientId { get; set; }

        public string Description { get; set; }
        public string FamilyDisease { get; set; }
        public string DeceasedFamily { get; set; }
        
          
    }
}
