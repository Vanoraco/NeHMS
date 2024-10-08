using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace HospitalManagementSystem.API.Models
{
    public class Patient
    {
        public int Id { get; set; }
        public string MRN { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public int Age { get; set; }
        public int Phone { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }

        public Gender Gender { get; set; }
        public int GenderId { get; set; }

        public MaritalStatus MaritalStatus { get; set; }
        public int MaritalStatusId { get; set; }

        public Language Language { get; set; }
        public int LanguageId { get; set; }

        public EducationLevel EducationLevel { get; set; }
        public int EducationLevelId { get; set; }

        public Country Country { get; set; }
        public int CountryId { get; set; }

        public City City { get; set; }
        public int CityId { get; set; }
        public PatientFile PatientFile { get; set; }
        public Death Death { get; set; }

        public bool is_decessed { get; set; }
        public BloodGroup BloodGroup { get; set; }
        public int BloodGroupId { get; set; }
        public string ImageUrl { get; set; }
        public MedicalInterviewAllergy MedicalInterviewAllergy { get; set; }




        // public int PatientFileId { get; set; }

        public ICollection<ResponsiblePerson> ResponsiblePersons { get; set; }
        public ICollection<Case> Cases { get; set; }
        public ICollection<Prescription> Prescriptions { get; set; }
        public ICollection<Recommendation> Recommendations { get; set; }
        public ICollection<PatientSchedule> PatientSchedules { get; set; }
        public ICollection<Operation> Operations { get; set; }
        
        public ICollection<Allergy> Allergies { get; set; }
        public ICollection<MedicalInterviewSocrates> MedicalInterviewSocrates { get; set; }
        public ICollection<MedicalHistoryFamily> MedicalHistoryFamilies { get; set; }

       
        public ICollection<MedicalHistoryDrug> MedicalHistoryDrugs { get; set; }
        public ICollection<MedicalHistory> MedicalHistorys { get; set; }


        public Patient()
        {
            ResponsiblePersons = new Collection<ResponsiblePerson>();
            Cases = new Collection<Case>();
            Prescriptions = new Collection<Prescription>();
            Recommendations = new Collection<Recommendation>();
            PatientSchedules = new Collection<PatientSchedule>();
            Operations = new Collection<Operation>();
           
            Allergies = new Collection<Allergy>();
            MedicalHistorys = new Collection<MedicalHistory>();
            MedicalInterviewSocrates = new Collection<MedicalInterviewSocrates>();
            MedicalHistoryFamilies = new Collection<MedicalHistoryFamily>();
            MedicalHistoryDrugs = new Collection<MedicalHistoryDrug>();
        }
    }
}
