using System.Collections.Generic;
using System.Collections.ObjectModel;
using HospitalManagementSystem.API.Models.Base;

namespace HospitalManagementSystem.API.Models
{
    public class AllowanceDeductionType : BaseModel
    {
        public string Type { get; set; }
        public ICollection<AllowanceDeduction> AllowanceDeductions { get; set; }

        public AllowanceDeductionType()
        {
            AllowanceDeductions = new Collection<AllowanceDeduction>();
        }
    }
}
