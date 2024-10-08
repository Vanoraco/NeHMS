using System;

namespace HospitalManagementSystem.API.Models
{
    public class BedAllotment
    {
        public int Id { get; set; }
        public DateTime AllotedDate { get; set; }
        public DateTime DiscourageDate { get; set; }
        public Bed  Bed{ get; set; }
        public int BedId { get; set; }
        public Patient  Patient{ get; set; }
        public int PatientId{ get; set; }
    }
}
