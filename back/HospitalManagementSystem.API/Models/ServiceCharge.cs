using HospitalManagementSystem.API.Models.Base;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace HospitalManagementSystem.API.Models
{
    public class ServiceCharge : BaseModel
    {
        public float Price { get; set; }
        public ICollection<BillLab> BillLabs { get; set; }
        public ICollection<BillSchedule> BillSchedules { get; set; }
        public ServiceCharge()
        {
            BillLabs = new Collection<BillLab>();
            BillSchedules = new Collection<BillSchedule>();
        }
    }
}