using HospitalManagementSystem.API.Configuration;
using HospitalManagementSystem.API.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HospitalManagementSystem.API.Data
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        { }
        public DbSet<AdmissionType> AdmissionTypes { get; set; }
        public DbSet<Gender> Genders { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<Language> Languages { get; set; }
        public DbSet<MaritalStatus> MaritalStatuses { get; set; }
        public DbSet<Occupation> Occupations { get; set; }
        public DbSet<EducationLevel> EducationLevels { get; set; }
        public DbSet<Relationship> Relationships { get; set; }
        public DbSet<PaymentOption> PaymentOptions { get; set; }
        public DbSet<MedicalDepartment> MedicalDepartments { get; set; }
        public DbSet<Patient> Patients { get; set; }
        public DbSet<ResponsiblePerson> ResponsiblePersons { get; set; }
        public DbSet<EmployeeRole> EmployeeRoles { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<AppointmentDuration> AppointmentDurations { get; set; }
        public DbSet<Receptionist> Receptionists { get; set; }
        public DbSet<Case> Cases { get; set; }
        public DbSet<Accountant> Accountants { get; set; }
        public DbSet<BloodGroup> BloodGroups { get; set; }
        public DbSet<Donor> Donors { get; set; }
        public DbSet<Pharmacist> Pharmacists { get; set; }
        public DbSet<Doctor> Doctors { get; set; }
        public DbSet<Image> ImageUploads { get; set; }
        public DbSet<MedicineCategory> MedicineCategories { get; set; }
        public DbSet<MedicineStockHospital> MedicineStockHospitas { get; set; }
        public DbSet<PatientFile> PatientFiles { get; set; }
        public DbSet<Laboratoriest> Laboratoriests { get; set; }
        public DbSet<Weekday> Weekdays { get; set; }
        public DbSet<Schedule> Schedules { get; set; }
        public DbSet<Prescription> Prescriptions { get; set; }
        public DbSet<Nurse> Nurses { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<Holiday> Holidays { get; set; }
        public DbSet<Specialization> Specializations { get; set; }
        public DbSet<Pathology> Pathologies { get; set; }
        public DbSet<WardType> WardTypes { get; set; }
        public DbSet<LaboratoryTestCategory> LaboratoryTestCategories { get; set; }
        public DbSet<Recommendation> Recommendations { get; set; }
        public DbSet<LaboratoryTestType> LaboratoryTestTypes { get; set; }
        public DbSet<Vaccine> Vaccines { get; set; }
        public DbSet<BedType> BedTypes { get; set; }
        public DbSet<Medication> Medications { get; set; }
        public DbSet<Building> Buildings { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<PatientSchedule> PatientSchedules { get; set; }
        public DbSet<BillSchedule> BillSchedules { get; set; }
        public DbSet<Ward> Wards { get; set; }
        public DbSet<Admission> Admissions { get; set; }
        public DbSet<LabRequest> LabRequests { get; set; }
        public DbSet<Radiology> Radiologies { get; set; }
        public DbSet<BillLab> BillLabs { get; set; }
        public DbSet<TaxRule> TaxRules { get; set; }
        public DbSet<Overtime> Overtimes { get; set; }

        public DbSet<RevenueCategory> RevenueCategorys { get; set; }
        public DbSet<LabRequest> Labrequests { get; set; }
        public DbSet<LabTestResult> LabTestResults { get; set; }
        public DbSet<MedSupplier> MedSuppliers { get; set; }
        public DbSet<PharmacyMedStock> PharmacyMedStocks { get; set; }
        public DbSet<PharmacySale> pharmacySales { get; set; }
        public DbSet<Notice> Notices { get; set; }
        public DbSet<BloodGroupStatus> BloodGroupStatuses { get; set; }
        public DbSet<ScheduleStatus> ScheduleStatuses { get; set; }
        public DbSet<InventorySupply> InventorySupplys { get; set; }
        public DbSet<Inventory> Inventorys { get; set; }
        public DbSet<PharmacyExpenseCatagory> PharmacyExpenseCatagorys { get; set; }
        public DbSet<PharmacyExpense> PharmacyExpenses { get; set; }
        public DbSet<MedicalCertificate> MedicalCertificates { get; set; }
        public DbSet<PreExamCheckup> PreExamCheckups { get; set; }
        public DbSet<ExpenseCatagory> ExpenseCatagories { get; set; }
        public DbSet<Expense> Expenses { get; set; }
        public DbSet<Birth> Births { get; set; }
        public DbSet<Death> Deaths { get; set; }
        public DbSet<Operation> Operations { get; set; }
        public DbSet<Available> Availables { get; set; }
        public DbSet<Bed> Beds { get; set; }
        public DbSet<BedAllotment> BedAllotments { get; set; }
        public DbSet<Allergy> Allergies { get; set; }
        public DbSet<MedicalInterviewAllergy> MedicalInterviewAllergies { get; set; }
        public DbSet<MedicalInterviewSocrates> MedicalInterviewSocrates { get; set; }
        public DbSet<EmployeeSalary> EmployeeSalaries { get; set; }
        public DbSet<PayrollReport> PayrollReports { get; set; }
        public DbSet<MedicalHistoryDrug> MedicalHistoryDrugs { get; set; }
        public DbSet<MedicalHistoryFamily> MedicalHistoryFamilies { get; set; }
        public DbSet<MedicalHistory> MedicalHistorys { get; set; }
        public DbSet<Designation> Designations { get; set; }
        public DbSet<ServiceCharge> ServiceCharges { get; set; }
        public DbSet<AllowanceDeductionType> AllowanceDeductionTypes { get; set; }
        public DbSet<AllowanceDeduction> AllowanceDeductionS { get; set; }
        public DbSet<Permission> Permissions{ get; set; }
        public DbSet<EmployeeAuth> EmployeeAuths { get; set; }
        public DbSet<Revenue> Revenues { get; set; }




        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.ApplyConfiguration(new AdmissionTypeConfigurations());
            builder.ApplyConfiguration(new GenderConfigurations());
            builder.ApplyConfiguration(new CityConfigurations());
            builder.ApplyConfiguration(new CountryConfigurations());
            builder.ApplyConfiguration(new LanguageConfigurations());
            builder.ApplyConfiguration(new MaritalStatusConfigurations());
            builder.ApplyConfiguration(new OccupationConfigurations());
            builder.ApplyConfiguration(new EducationLevelConfigurations());
            builder.ApplyConfiguration(new RelationshipConfigurations());
            builder.ApplyConfiguration(new PaymentOptionConfigurations());
            builder.ApplyConfiguration(new MedicalDepartmentConfigurations());
            builder.ApplyConfiguration(new PatientConfiguration()); 

            builder.ApplyConfiguration(new ImageUploadConfigurations());

            builder.ApplyConfiguration(new ResponsiblePersonConfigurations());
            builder.ApplyConfiguration(new EmployeeRoleConfigurations());
            builder.ApplyConfiguration(new EmployeeConfigurations());
            builder.ApplyConfiguration(new AppointmentDurationConfigurations());
            builder.ApplyConfiguration(new ReceptionistConfigurations());
            builder.ApplyConfiguration(new CaseConfigurations());
            builder.ApplyConfiguration(new AccountantConfigurations());
            builder.ApplyConfiguration(new BloodGroupConfigurations());
            builder.ApplyConfiguration(new DonorConfigurations());
            builder.ApplyConfiguration(new PharmacistConfigurations());
            builder.ApplyConfiguration(new DoctorConfigurations());
            builder.ApplyConfiguration(new PatientFileConfigurations());
            builder.ApplyConfiguration(new LaboratoriestConfigurations());
            builder.ApplyConfiguration(new MedicineCategoryConfigurations());
            builder.ApplyConfiguration(new MedicineStockHospitalConfigurations());
            builder.ApplyConfiguration(new WeekdayConfigurations());
            builder.ApplyConfiguration(new ScheduleConfigurations());
            builder.ApplyConfiguration(new PrescriptionConfigurations());
            builder.ApplyConfiguration(new NurseConfigurations());
            builder.ApplyConfiguration(new NotificationConfigurations());
            builder.ApplyConfiguration(new HolidayConfigurations());
            builder.ApplyConfiguration(new SpecializationConfigurations());
            builder.ApplyConfiguration(new HolidayConfigurations());
            builder.ApplyConfiguration(new PathologyConfigurations());
            builder.ApplyConfiguration(new VaccineConfigurations());
            builder.ApplyConfiguration(new LaboratoryTestCategoryConfigurations());
            builder.ApplyConfiguration(new RecommendationConfigurations());
            builder.ApplyConfiguration(new LaboratoryTestTypeConfigurations());
            builder.ApplyConfiguration(new RadiologyConfigurations());
            builder.ApplyConfiguration(new LabTestResultConfigurations());
            builder.ApplyConfiguration(new WardTypeConfigurations());
            builder.ApplyConfiguration(new BedTypeConfigurations());
            builder.ApplyConfiguration(new MedicationConfigurations());
            builder.ApplyConfiguration(new BuildingConfigurations());
            builder.ApplyConfiguration(new RoomConfigurations());
            builder.ApplyConfiguration(new PatientScheduleConfigurations());
            builder.ApplyConfiguration(new BillScheduleConfigurations());
            builder.ApplyConfiguration(new WardConfiguration());
            builder.ApplyConfiguration(new AdmissionConfigurations());
            builder.ApplyConfiguration(new LabRequestConfiguration());
            builder.ApplyConfiguration(new BillLabConfigurations());
            builder.ApplyConfiguration(new TaxRuleConfigurations());
            builder.ApplyConfiguration(new OvertimeConfigurations());
            builder.ApplyConfiguration(new RevenueCategoryConfigurations());
            builder.ApplyConfiguration(new MedSupplierConfigurations());
            builder.ApplyConfiguration(new PharmacyMedStockConfigurations());
            builder.ApplyConfiguration(new PharmacyMedStockConfigurations());
            builder.ApplyConfiguration(new NoticeConfigurations());
            builder.ApplyConfiguration(new BloodGroupStatusConfigurations());
            builder.ApplyConfiguration(new ScheduleStatusConfigurations());
            builder.ApplyConfiguration(new InventorySupplyConfigurations());
            builder.ApplyConfiguration(new InventoryConfigurations());
            builder.ApplyConfiguration(new PharmacyExpenseCatagoryConfigurations());
            builder.ApplyConfiguration(new PharmacyExpenseConfigurations());
            builder.ApplyConfiguration(new BirthConfigurations());
            builder.ApplyConfiguration(new DeathConfigurations());
            builder.ApplyConfiguration(new OperationConfigurations());
            builder.ApplyConfiguration(new MedicalCertificateConfigurations());
            builder.ApplyConfiguration(new PreExamCheckupConfigurations());
            builder.ApplyConfiguration(new ExpenseCatagoryConfigurations());
            builder.ApplyConfiguration(new ExpenseConfigurations());
            builder.ApplyConfiguration(new AvailableConfigurations());
            builder.ApplyConfiguration(new BedConfigurations());
            builder.ApplyConfiguration(new BedAllotmentConfigurations());
            builder.ApplyConfiguration(new AllergyConfigurations());
            builder.ApplyConfiguration(new MedicalInterviewAllergyConfigurations());
            builder.ApplyConfiguration(new MedicalInterviewSocratesConfigurations());
            builder.ApplyConfiguration(new EmployeeSalaryConfigurations());
            builder.ApplyConfiguration(new PayrollSalaryConfigurations());
            builder.ApplyConfiguration(new MedicalHistoryDrugConfigurations());
            builder.ApplyConfiguration(new MedicalHistoryFamilyConfigurations());
            builder.ApplyConfiguration(new Designationconfigurations());
            builder.ApplyConfiguration(new MedicalHistoryConfigurations());
            builder.ApplyConfiguration(new ServiceChargeConfigurations());
            builder.ApplyConfiguration(new AllowanceDeductionTypeConfigurations());
            builder.ApplyConfiguration(new AllowanceDeductionConfigurations());
            builder.ApplyConfiguration(new PermissionConfigurations());
            builder.ApplyConfiguration(new EmployeeAuthConfigurations());
            builder.ApplyConfiguration(new RevenueConfigurations());

        }
    }
}
    
    
    

