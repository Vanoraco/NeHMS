namespace HospitalManagementSystem.API.Models
{
    public class Image
    {
        public int Id { get; set; }
        public Patient Patient { get; set; }
        public int PatientId { get; set; }
        public string ImageUrl { get; set; }
    }
}
