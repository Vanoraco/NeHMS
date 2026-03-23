using HospitalManagementSystem.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HospitalManagementSystem.API.IRepositories
{
    public interface IUnitOfWork : IDisposable
    {
        Task Save(); 

        IGenericRepository<AdmissionType> AdmissionTypes { get; }
        IGenericRepository<City> Cities { get; }
        IGenericRepository<Country> Countries { get; }
        IGenericRepository<Language> Languages { get; }
        IGenericRepository<Occupation> Occupations { get; }
        IGenericRepository<EducationLevel> EducationLevels { get; }
        IGenericRepository<MaritalStatus> MaritalStatuses { get; }
        IGenericRepository<MedicalDepartment> MedicalDepartments { get; }
        IGenericRepository<Relationship> Relationships { get; }
        IGenericRepository<PaymentOption> PaymentOptions { get; }
        IGenericRepository<Gender> Genders { get; }
        IGenericRepository<Patient> Patients { get; }
        IGenericRepository<ResponsiblePerson> ResponsiblePersons { get; }
        IGenericRepository<EmployeeRole> EmployeeRoles { get; }
        IGenericRepository<Employee> Employees { get; }
        IGenericRepository<AppointmentDuration> AppointmentDurations { get; }
        IGenericRepository<Case> Cases { get; }
        IGenericRepository<Image> Images { get; }
        IGenericRepository<Accountant> Accountants { get; }
        IGenericRepository<BloodGroup> BloodGroups { get; }
        IGenericRepository<Donor> Donors { get; }
        IGenericRepository<Pharmacist> Pharmacists { get; }
        IGenericRepository<Doctor> Doctors { get; }
        IGenericRepository<MedicineCategory> MedicineCategories { get; }
        IGenericRepository<MedicineStockHospital> MedicineStockHospitals { get; }
        IGenericRepository<Laboratoriest> Laboratoriests { get; }
        IGenericRepository<Receptionist> Receptionists { get; }
        IGenericRepository<Weekday> Weekdays { get; }
        IGenericRepository<Pathology> Pathologies { get; }
        IGenericRepository<Radiology> Radiologies { get; }
        IGenericRepository<WardType> WardTypes { get; }
        IGenericRepository<Nurse> Nurses { get; }
        IGenericRepository<Notification> Notifications { get; }
        IGenericRepository<Schedule> Schedules { get; }
        IGenericRepository<LaboratoryTestType> LaboratoryTestTypes { get; }
        IGenericRepository<LabTestResult> LabTestResults { get; }
        IGenericRepository<Specialization> Specializations { get; }
        IGenericRepository<Vaccine> Vaccines { get; }
        IGenericRepository<Holiday> Holidays { get; }
        IGenericRepository<PatientFile> PatientFiles { get; }
        IGenericRepository<Recommendation> Recommendations { get; }
        IGenericRepository<LaboratoryTestCategory> LaboratoryTestCategories { get; }
        IGenericRepository<Prescription> Prescriptions { get; }
        IGenericRepository<Building> Buildings { get; }
        IGenericRepository<Room> Rooms { get; }
        IGenericRepository<Ward> Wards { get; }
        IGenericRepository<Admission> Admissions { get; }
        IGenericRepository<LabRequest> LabRequests { get; }
        IGenericRepository<BillLab> BillLabs { get; }
        IGenericRepository<Medication> Medications { get; }
        IGenericRepository<TaxRule> TaxRules { get; }
        IGenericRepository<Overtime> Overtimes { get; }
        IGenericRepository<RevenueCategory> RevenueCategories { get; }
        
        IGenericRepository<PatientSchedule> PatientSchedules { get; }
        IGenericRepository<BillSchedule> BillSchedules { get; }
        IGenericRepository<MedSupplier> MedSuppliers { get; }
        IGenericRepository<PharmacyMedStock> PharmacyMedStocks { get; }
        IGenericRepository<PharmacySale> PharmacySales { get; }
        IGenericRepository<InventorySupply> InventorySupplies { get; }
        IGenericRepository<Inventory> Inventories { get; }
        IGenericRepository<PharmacyExpenseCatagory> PharmacyExpenseCategories { get; }
        IGenericRepository<PharmacyExpense> PharmacyExpenses { get; }
        IGenericRepository<Birth> Births { get; }
        IGenericRepository<MedicalCertificate> MedicalCertificates { get; }
        IGenericRepository<PreExamCheckup> PreExamCheckups { get; }
        IGenericRepository<ExpenseCatagory> ExpenseCategories { get; }
        IGenericRepository<Expense> Expenses { get; }
        IGenericRepository<Allergy> Allergies { get; }
        IGenericRepository<MedicalInterviewAllergy> MedicalInterviewAllergies { get; }
        IGenericRepository<EmployeeSalary> EmployeeSalaries { get; }
        IGenericRepository<PayrollReport> PayrollReports { get; }

        IGenericRepository<MedicalHistoryDrug> MedicalHistoryDrugs { get; }
        IGenericRepository<MedicalHistory> MedicalHistories { get; }
        IGenericRepository<EmployeeAuth> EmployeeAuths { get; }
        IGenericRepository<Revenue> Revenues { get; }

    }
}
