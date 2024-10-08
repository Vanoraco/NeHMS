using HospitalManagementSystem.API.Models.Base;
using System;

namespace HospitalManagementSystem.API.Models
{
    public class Notice:BaseModel
    {
        public string NoticeBoard { get; set; }
        public DateTime Date { get; set; }
       
    }
}
