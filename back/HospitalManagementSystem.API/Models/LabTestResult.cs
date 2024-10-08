namespace HospitalManagementSystem.API.Models
{
    public class LabTestResult
    {
        public int Id { set; get; }
        public string Name { set; get; }
        public string Result { set; get; }
        public LabRequest LabRequest { get; set; }
        public int LabRequestId { get; set; }
        public LaboratoryTestType LaboratoryTestType { get; set; }
        public int LaboratoryTestTypeId { get; set; }
        public string Description { set; get; }
    }
}
