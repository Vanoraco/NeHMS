namespace HospitalManagementSystem.API.Models
{
    public class TaxRule
    {
        public int Id { get; set; }
        public float FromSalary { get; set; }
        public float ToSalary { get; set; }
        public float percentageAmount { get; set; }
        public float deduction { get; set; }
    }
}
