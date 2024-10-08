

using HospitalManagementSystem.API.Models;
using System.ComponentModel.DataAnnotations;

namespace HospitalManagementSystem.API.Dtos.EmployeeAuth
{
    public class EmployeeAuthFormDto
    {

        [Required]
        public int EmployeeId { get; set; }
       
        [Required]
        [MaxLength(50)]
        public string EmailAddress { get; set; }
        [Required]
        [MaxLength(50)]
        public string Password { get; set; } = string.Empty;
       
    }
}
