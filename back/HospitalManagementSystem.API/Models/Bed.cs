namespace HospitalManagementSystem.API.Models
{
    public class Bed
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Code{ get; set; }
        public BedType BedType { get; set; }

        public int BedTypeId { get; set; }
        public Ward Ward{ get; set; }

        public int WardId { get; set; }
        public Available Available { get; set; }

        public int AvailableId { get; set; }



    }




}
