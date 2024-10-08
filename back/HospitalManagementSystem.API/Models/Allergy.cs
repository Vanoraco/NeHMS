using System.Collections.Generic;
using System.Collections.ObjectModel;
using HospitalManagementSystem.API.Models.Base;

namespace HospitalManagementSystem.API.Models
{
    public class Allergy : BaseModel
    {
        public ICollection<MedicalInterviewAllergy> MedicalInterviewAllergies { get; set; }
        public ICollection<Patient> Patients { get; set; }

        public Allergy()
        {
            MedicalInterviewAllergies = new Collection<MedicalInterviewAllergy>();
            Patients = new Collection<Patient>();
        }
    }
}
