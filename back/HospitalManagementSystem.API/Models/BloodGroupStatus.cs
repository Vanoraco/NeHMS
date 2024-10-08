namespace HospitalManagementSystem.API.Models
{
    public class BloodGroupStatus
    {
        public int Id { get; set; }
        public int Status { get; set; }
        public BloodGroup BloodGroup { get; set; }
    }
}
