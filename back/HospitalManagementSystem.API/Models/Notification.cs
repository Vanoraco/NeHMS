using System;
namespace HospitalManagementSystem.API.Models
{
    public class Notification
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public bool Status { get; set; }
        public Employee Employee { get; set; }
        public int EmployeeId { get; set; }
        public string Description { get; set; }
    }
}
