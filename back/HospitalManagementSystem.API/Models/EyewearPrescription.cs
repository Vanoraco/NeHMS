using System;
using System.ComponentModel.DataAnnotations;

namespace HospitalManagementSystem.API.Models
{
    public class EyewearPrescription
    {
        public int Id { get; set; }
        
        // Right Eye Distant Vision
        [Required]
        public float RightEyeSphDistant { get; set; } // Sphere measurement
        [Required]
        public float RightEyeCylDistant { get; set; } // Cylinder measurement
        [Required]
        public int RightEyeAxisDistant { get; set; } // Axis measurement
        
        // Right Eye Close Vision
        [Required]
        public float RightEyeSphClose { get; set; } // Sphere measurement
        [Required]
        public float RightEyeCylClose { get; set; } // Cylinder measurement
        [Required]
        public int RightEyeAxisClose { get; set; } // Axis measurement
        
        // Left Eye Distant Vision
        [Required]
        public float LeftEyeSphDistant { get; set; } // Sphere measurement
        [Required]
        public float LeftEyeCylDistant { get; set; } // Cylinder measurement
        [Required]
        public int LeftEyeAxisDistant { get; set; } // Axis measurement
        
        // Left Eye Close Vision
        [Required]
        public float LeftEyeSphClose { get; set; } // Sphere measurement
        [Required]
        public float LeftEyeCylClose { get; set; } // Cylinder measurement
        [Required]
        public int LeftEyeAxisClose { get; set; } // Axis measurement
        
        // Far and Near Vision Measurements
        [Required]
        public float Far { get; set; } // Far vision measurement
        [Required]
        public float Near { get; set; } // Near vision measurement
        
        // New properties for eyewear features
        public bool PhotoSolar { get; set; } // Checkbox for PhotoSolar
        public bool Bifocal { get; set; }     // Checkbox for Bifocal
        public bool Progressive { get; set; }  // Checkbox for Progressive
        public bool ScratchResistant { get; set; } // Checkbox for Scratch Resistance
        public bool ResinPlastic { get; set; } // Checkbox for Resin Plastic
        public bool GlareFree { get; set; }    // Checkbox for Glare Free
        public bool HiIndex { get; set; }      // Checkbox for Hi-Index

        // Relationships and Additional Properties
        public Patient Patient { get; set; } // Navigation property for Patient
        public int PatientId { get; set; }    // Foreign key for Patient

        public Employee Employee { get; set; } // Navigation property for Employee
        public int EmployeeId { get; set; }    // Foreign key for Employee

        public Admission Admission { get; set; } // Navigation property for Admission
        public int AdmissionId { get; set; }    // Foreign key for Admission
        
         // Subject of the prescription
        public DateTime OrderDate { get; set; } // Date of the order
        
        public bool IsCancelled { get; set; } // Flag indicating if the prescription is cancelled
    }
}
