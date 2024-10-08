using HospitalManagementSystem.API.Models.Base;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;

namespace HospitalManagementSystem.API.Models
{
    public class ExpenseCatagory : BaseModel
    {
        public ICollection<Expense> Expenses { get; set; }

        public ExpenseCatagory()
        {
            Expenses = new Collection<Expense>();
        }

    }
}
