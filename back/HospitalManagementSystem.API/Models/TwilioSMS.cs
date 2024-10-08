namespace HospitalManagementSystem.API.Models
{
    public class TwilioSMS
    {
        public string From { get; set; }
        public string To { get; set; }
        public string Message { get; set; }
    }
}
