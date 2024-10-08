using System.Collections.Generic;
using System.Collections.ObjectModel;
using HospitalManagementSystem.API.Models.Base;

namespace HospitalManagementSystem.API.Models
{
    public class Medication : BaseModel
    {
        public MedicineCategory MedicineCategory { get; set; }
        public int MedicineCategoryId { get; set; }
        public MedicineStockHospital MedicineStockHospital { get; set; }
        public PharmacyMedStock PharmacyMedStock { get; set; }

        public ICollection<Prescription> Prescriptions { get; set; }

        public Medication()
        {
            Prescriptions = new Collection<Prescription>();
        }
    }
}
