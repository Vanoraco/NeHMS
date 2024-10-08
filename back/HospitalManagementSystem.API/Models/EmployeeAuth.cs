namespace HospitalManagementSystem.API.Models
{
    public class EmployeeAuth
    {


        public int Id { get; set; }
        public string EmailAddress { get; set; }
        public Employee Employee { get; set; }
        public int EmployeeId { get; set; }
        public string Password { get; set; }  

       // public byte[] PasswordSalt { get; set; }
    }
}
