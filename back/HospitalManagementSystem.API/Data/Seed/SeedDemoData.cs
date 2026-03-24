using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HospitalManagementSystem.API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace HospitalManagementSystem.API.Data.Seed
{
    public static class SeedDemoData
    {
        public static async Task EnsureSeededAsync(DatabaseContext context, ILogger logger)
        {
            if (await context.Countries.AnyAsync())
            {
                return;
            }

            var now = DateTime.UtcNow;

            var country = new Country { Name = "Ethiopia" };
            context.Countries.Add(country);

            var cities = new List<City>
            {
                new City { Name = "Addis Ababa" },
                new City { Name = "Bahir Dar" },
                new City { Name = "Mekelle" },
                new City { Name = "Hawassa" },
                new City { Name = "Dire Dawa" }
            };
            context.Cities.AddRange(cities);

            var genders = new List<Gender>
            {
                new Gender { Name = "Male" },
                new Gender { Name = "Female" }
            };
            context.Genders.AddRange(genders);

            var maritalStatuses = new List<MaritalStatus>
            {
                new MaritalStatus { Name = "Single" },
                new MaritalStatus { Name = "Married" }
            };
            context.MaritalStatuses.AddRange(maritalStatuses);

            var languages = new List<Language>
            {
                new Language { Name = "Amharic" },
                new Language { Name = "Oromo" },
                new Language { Name = "Tigrinya" },
                new Language { Name = "Somali" },
                new Language { Name = "Afar" }
            };
            context.Languages.AddRange(languages);

            var educationLevels = new List<EducationLevel>
            {
                new EducationLevel { Name = "Diploma" },
                new EducationLevel { Name = "BSc" },
                new EducationLevel { Name = "MSc" }
            };
            context.EducationLevels.AddRange(educationLevels);

            var employeeRoles = new List<EmployeeRole>
            {
                new EmployeeRole { Name = "Admin", Permission = "All" },
                new EmployeeRole { Name = "Doctor", Permission = "Clinical" },
                new EmployeeRole { Name = "Nurse", Permission = "Clinical" },
                new EmployeeRole { Name = "Reception", Permission = "FrontDesk" }
            };
            context.EmployeeRoles.AddRange(employeeRoles);

            var departments = new List<MedicalDepartment>
            {
                new MedicalDepartment { Name = "Internal Med" },
                new MedicalDepartment { Name = "Pediatrics" },
                new MedicalDepartment { Name = "Surgery" }
            };
            context.MedicalDepartments.AddRange(departments);

            var designations = new List<Designation>
            {
                new Designation { Name = "Consultant" },
                new Designation { Name = "Resident" }
            };
            context.Designations.AddRange(designations);

            var specializations = new List<Specialization>
            {
                new Specialization { Name = "General Practice" },
                new Specialization { Name = "Cardiology" }
            };
            context.Specializations.AddRange(specializations);

            var bloodGroupStatuses = new List<BloodGroupStatus>
            {
                new BloodGroupStatus { Status = 1 },
                new BloodGroupStatus { Status = 1 }
            };
            context.BloodGroupStatuses.AddRange(bloodGroupStatuses);

            var bloodGroups = new List<BloodGroup>
            {
                new BloodGroup { Name = "A+", BloodGroupStatus = bloodGroupStatuses[0] },
                new BloodGroup { Name = "O+", BloodGroupStatus = bloodGroupStatuses[1] }
            };
            context.BloodGroups.AddRange(bloodGroups);

            var admissionTypes = new List<AdmissionType>
            {
                new AdmissionType { Name = "Inpatient", Description = "Admitted" },
                new AdmissionType { Name = "Outpatient", Description = "OPD" }
            };
            context.AdmissionTypes.AddRange(admissionTypes);

            var scheduleStatuses = new List<ScheduleStatus>
            {
                new ScheduleStatus { Name = "Scheduled" },
                new ScheduleStatus { Name = "Completed" }
            };
            context.ScheduleStatuses.AddRange(scheduleStatuses);

            var appointmentDurations = new List<AppointmentDuration>
            {
                new AppointmentDuration { Name = "15 min", Description = "15 minutes" },
                new AppointmentDuration { Name = "30 min", Description = "30 minutes" }
            };
            context.AppointmentDurations.AddRange(appointmentDurations);

            var building = new Building { Name = "Main", Code = 100, Description = "Main Building" };
            context.Buildings.Add(building);

            var rooms = new List<Room>
            {
                new Room { Name = "Room 101", Building = building, FloorNumber = 1, Code = 101, Description = "General" },
                new Room { Name = "Room 102", Building = building, FloorNumber = 1, Code = 102, Description = "General" }
            };
            context.Rooms.AddRange(rooms);

            var serviceCharges = new List<ServiceCharge>
            {
                new ServiceCharge { Name = "Consultation", Price = 250, Description = "Doctor consultation" },
                new ServiceCharge { Name = "Ward", Price = 500, Description = "Ward fee" }
            };
            context.ServiceCharges.AddRange(serviceCharges);

            var medicineCategories = new List<MedicineCategory>
            {
                new MedicineCategory { Name = "Antibiotic", Description = "Antibiotic" },
                new MedicineCategory { Name = "Analgesic", Description = "Pain relief" }
            };
            context.MedicineCategories.AddRange(medicineCategories);

            var medications = new List<Medication>
            {
                new Medication { Name = "Amoxicillin", Description = "500mg", MedicineCategory = medicineCategories[0] },
                new Medication { Name = "Paracetamol", Description = "500mg", MedicineCategory = medicineCategories[1] }
            };
            context.Medications.AddRange(medications);

            var medSuppliers = new List<MedSupplier>
            {
                new MedSupplier { Name = "Addis Pharma", Description = "Local supplier", Address = "Addis Ababa", PhoneNumber = 911234567 }
            };
            context.MedSuppliers.AddRange(medSuppliers);

            await context.SaveChangesAsync();

            var employees = new List<Employee>
            {
                new Employee
                {
                    FirstName = "Tesfaye",
                    MiddleName = "Bekele",
                    LastName = "Woldemichael",
                    DateOfBirth = now.AddYears(-35),
                    Age = 35,
                    Address = "Addis Ababa",
                    Phone = 911000001,
                    EmailAddress = "tesfaye.wolde@example.com",
                    ImageUrl = "employee1.png",
                    GenderId = genders[0].Id,
                    MaritalStatusId = maritalStatuses[1].Id,
                    LanguageId = languages[0].Id,
                    EducationLevelId = educationLevels[1].Id,
                    EmployeeRoleId = employeeRoles[1].Id,
                    MedicalDepartmentId = departments[0].Id,
                    CityId = cities[0].Id,
                    CountryId = country.Id,
                    DesignationId = designations[0].Id,
                    SpecializationId = specializations[0].Id
                },
                new Employee
                {
                    FirstName = "Hanna",
                    MiddleName = "Yonas",
                    LastName = "Abebe",
                    DateOfBirth = now.AddYears(-29),
                    Age = 29,
                    Address = "Bahir Dar",
                    Phone = 911000002,
                    EmailAddress = "hanna.abebe@example.com",
                    ImageUrl = "employee2.png",
                    GenderId = genders[1].Id,
                    MaritalStatusId = maritalStatuses[0].Id,
                    LanguageId = languages[0].Id,
                    EducationLevelId = educationLevels[0].Id,
                    EmployeeRoleId = employeeRoles[2].Id,
                    MedicalDepartmentId = departments[1].Id,
                    CityId = cities[1].Id,
                    CountryId = country.Id,
                    DesignationId = designations[1].Id,
                    SpecializationId = specializations[1].Id
                },
                new Employee
                {
                    FirstName = "Biruk",
                    MiddleName = "Amanuel",
                    LastName = "Demissie",
                    DateOfBirth = now.AddYears(-38),
                    Age = 38,
                    Address = "Addis Ababa",
                    Phone = 911000003,
                    EmailAddress = "biruk.demissie@example.com",
                    ImageUrl = "employee3.png",
                    GenderId = genders[0].Id,
                    MaritalStatusId = maritalStatuses[1].Id,
                    LanguageId = languages[0].Id,
                    EducationLevelId = educationLevels[2].Id,
                    EmployeeRoleId = employeeRoles[0].Id,
                    MedicalDepartmentId = departments[2].Id,
                    CityId = cities[0].Id,
                    CountryId = country.Id,
                    DesignationId = designations[0].Id,
                    SpecializationId = specializations[0].Id
                },
                new Employee
                {
                    FirstName = "Selamawit",
                    MiddleName = "Kiros",
                    LastName = "Mulu",
                    DateOfBirth = now.AddYears(-27),
                    Age = 27,
                    Address = "Dire Dawa",
                    Phone = 911000004,
                    EmailAddress = "selamawit.mulu@example.com",
                    ImageUrl = "employee4.png",
                    GenderId = genders[1].Id,
                    MaritalStatusId = maritalStatuses[0].Id,
                    LanguageId = languages[0].Id,
                    EducationLevelId = educationLevels[0].Id,
                    EmployeeRoleId = employeeRoles[3].Id,
                    MedicalDepartmentId = departments[0].Id,
                    CityId = cities[4].Id,
                    CountryId = country.Id,
                    DesignationId = designations[1].Id,
                    SpecializationId = specializations[1].Id
                }
            };
            context.Employees.AddRange(employees);

            var patients = new List<Patient>
            {
                new Patient
                {
                    MRN = "ETH-0001",
                    FirstName = "Amanuel",
                    MiddleName = "Kebede",
                    LastName = "Tadesse",
                    DateOfBirth = now.AddYears(-40),
                    Age = 40,
                    Phone = 911100001,
                    Email = "amanuel.tadesse@example.com",
                    Address = "Addis Ababa",
                    GenderId = genders[0].Id,
                    MaritalStatusId = maritalStatuses[1].Id,
                    LanguageId = languages[0].Id,
                    EducationLevelId = educationLevels[0].Id,
                    CountryId = country.Id,
                    CityId = cities[0].Id,
                    BloodGroupId = bloodGroups[0].Id,
                    ImageUrl = "patient1.png"
                },
                new Patient
                {
                    MRN = "ETH-0002",
                    FirstName = "Selam",
                    MiddleName = "Abate",
                    LastName = "Girma",
                    DateOfBirth = now.AddYears(-28),
                    Age = 28,
                    Phone = 911100002,
                    Email = "selam.girma@example.com",
                    Address = "Hawassa",
                    GenderId = genders[1].Id,
                    MaritalStatusId = maritalStatuses[0].Id,
                    LanguageId = languages[0].Id,
                    EducationLevelId = educationLevels[1].Id,
                    CountryId = country.Id,
                    CityId = cities[3].Id,
                    BloodGroupId = bloodGroups[1].Id,
                    ImageUrl = "patient2.png"
                }
            };
            context.Patients.AddRange(patients);

            await context.SaveChangesAsync();

            var passwordHasher = new PasswordHasher<EmployeeAuth>();
            var demoPassword = "Password123!";
            var employeeAuths = new List<EmployeeAuth>
            {
                new EmployeeAuth
                {
                    EmailAddress = "admin@nehms.demo",
                    EmployeeId = employees[2].Id
                },
                new EmployeeAuth
                {
                    EmailAddress = "doctor@nehms.demo",
                    EmployeeId = employees[0].Id
                },
                new EmployeeAuth
                {
                    EmailAddress = "nurse@nehms.demo",
                    EmployeeId = employees[1].Id
                },
                new EmployeeAuth
                {
                    EmailAddress = "reception@nehms.demo",
                    EmployeeId = employees[3].Id
                }
            };
            foreach (var employeeAuth in employeeAuths)
            {
                employeeAuth.Password = passwordHasher.HashPassword(employeeAuth, demoPassword);
            }
            context.EmployeeAuths.AddRange(employeeAuths);
            await context.SaveChangesAsync();

            var pharmacyMedStocks = new List<PharmacyMedStock>
            {
                new PharmacyMedStock
                {
                    Name = "Amoxicillin Stock",
                    Description = "Amoxicillin 500mg",
                    MedicationId = medications[0].Id,
                    BatchNumber = "AMX-001",
                    ExpirationDate = now.AddMonths(18),
                    Quantity = 100,
                    Price = 12,
                    EmployeeId = employees[0].Id,
                    TimeStamp = now,
                    MedSupplierId = medSuppliers[0].Id
                },
                new PharmacyMedStock
                {
                    Name = "Paracetamol Stock",
                    Description = "Paracetamol 500mg",
                    MedicationId = medications[1].Id,
                    BatchNumber = "PCM-001",
                    ExpirationDate = now.AddMonths(12),
                    Quantity = 200,
                    Price = 5,
                    EmployeeId = employees[1].Id,
                    TimeStamp = now,
                    MedSupplierId = medSuppliers[0].Id
                }
            };
            context.PharmacyMedStocks.AddRange(pharmacyMedStocks);

            await context.SaveChangesAsync();

            var pharmacySales = new List<PharmacySale>
            {
                new PharmacySale
                {
                    description = "OTC sale",
                    Amount = 2,
                    Price = 12,
                    TimeStamp = now,
                    PharmacyMedStockId = pharmacyMedStocks[0].Id,
                    EmployeeId = employees[0].Id
                }
            };
            context.PharmacySales.AddRange(pharmacySales);

            var schedules = new List<PatientSchedule>
            {
                new PatientSchedule
                {
                    PatientId = patients[0].Id,
                    EmployeeId = employees[0].Id,
                    AdmissionTypeId = admissionTypes[0].Id,
                    RoomId = rooms[0].Id,
                    ScheduleStatusId = scheduleStatuses[0].Id,
                    AppointmentDurationId = appointmentDurations[0].Id,
                    Statues = "Scheduled",
                    ScheduleDate = now.Date,
                    ScheduleTime = now,
                    TimeStamp = now
                },
                new PatientSchedule
                {
                    PatientId = patients[1].Id,
                    EmployeeId = employees[1].Id,
                    AdmissionTypeId = admissionTypes[1].Id,
                    RoomId = rooms[1].Id,
                    ScheduleStatusId = scheduleStatuses[0].Id,
                    AppointmentDurationId = appointmentDurations[1].Id,
                    Statues = "Scheduled",
                    ScheduleDate = now.Date.AddDays(1),
                    ScheduleTime = now.AddDays(1),
                    TimeStamp = now
                }
            };
            context.PatientSchedules.AddRange(schedules);

            await context.SaveChangesAsync();

            var billSchedules = new List<BillSchedule>
            {
                new BillSchedule
                {
                    PatientScheduleId = schedules[0].Id,
                    ServiceChargeId = serviceCharges[0].Id,
                    Date = now,
                    EmployeeId = employees[0].Id
                }
            };
            context.BillSchedules.AddRange(billSchedules);

            await context.SaveChangesAsync();

            logger.LogInformation("Seeded demo Ethiopian data.");
        }
    }
}
