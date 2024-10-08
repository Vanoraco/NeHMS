using HospitalManagementSystem.API.Models.Base;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace HospitalManagementSystem.API.Models
{
    public class Available : BaseModel
    {
        public ICollection<Bed> Beds { get; set; }

        public Available()
        {
            Beds = new Collection<Bed>();

        }
    }
}
