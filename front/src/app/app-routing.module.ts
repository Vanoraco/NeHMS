import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ScheduleComponent } from '@syncfusion/ej2-angular-schedule';
import { AdmissionDetailComponent } from './components/admission/admission-detail/admission-detail.component';
import { AdmissionTypeComponent } from './components/admission/admission-type/admission-type.component';
import { AdmissionComponent } from './components/admission/admission.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { PaidPatientScheduleComponent } from './components/appointment/patient-schedule/paid-patient-schedule/paid-patient-schedule.component';
import { PatientScheduleDetailComponent } from './components/appointment/patient-schedule/patient-schedule-detail/patient-schedule-detail.component';
import { PatientScheduleComponent } from './components/appointment/patient-schedule/patient-schedule.component';
import { UnpaidPatientScheduleComponent } from './components/appointment/patient-schedule/unpaid-patient-schedule/unpaid-patient-schedule.component';
import { Error404Component } from './components/auth/error404/error404.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AvailableComponent } from './components/bed/available/available.component';
import { BedAllotmentComponent } from './components/bed/bed-allotment/bed-allotment.component';
import { BedComponent } from './components/bed/bed.component';
import { BedtypeComponent } from './components/bed/bedtype/bedtype.component';
import { BillLaboratoryComponent } from './components/billing/bill-laboratory/bill-laboratory.component';
import { BillScheduleComponent } from './components/billing/bill-schedule.component';
import { ServiceChargeComponent } from './components/billing/service-charge/service-charge.component';
import { BloodGroupStatusComponent } from './components/blood-bank/blood-group-status/blood-group-status.component';
import { BloodGroupComponent } from './components/blood-bank/blood-group/blood-group.component';
import { DonorComponent } from './components/blood-bank/donor/donor.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ExpenseCategoryComponent } from './components/finance/expense/expense-category/expense-category.component';
import { ExpenseComponent } from './components/finance/expense/expense/expense.component';
import { PharmacyExpenseCategoryComponent } from './components/finance/expense/pharmacy-expense-category/pharmacy-expense-category.component';
import { PharmacyExpenseComponent } from './components/finance/expense/pharmacy-expense/pharmacy-expense.component';
import { PayrollReportComponent } from './components/finance/payroll/payroll-report/payroll-report.component';
import { RevenueCategoryComponent } from './components/finance/revenue/revenue-category/revenue-category.component';
import { RevenueComponent } from './components/finance/revenue/revenue.component';
import { EmployeeDetailComponent } from './components/human-resource/employee/employee-detail/employee-detail.component';
import { EmployeeComponent } from './components/human-resource/employee/employee.component';
import { EmployeeProfileComponent } from './components/human-resource/employees-profile/employees-profile.component';
import { InPatientComponent } from './components/in-patient/in-patient.component';
import { IpdDetailComponent } from './components/in-patient/ipd-detail/ipd-detail.component';
import { InventorySupplierComponent } from './components/inventory/inventory-supplier/inventory-supplier.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { LabRequestComponent } from './components/laboratory/lab-request/lab-request.component';
import { LabTestResultComponent } from './components/laboratory/lab-test-result/lab-test-result.component';
import { LaboratoryTestCategoryComponent } from './components/laboratory/laboratory-test-category/laboratory-test-category.component';
import { LaboratoryTestTypeComponent } from './components/laboratory/laboratory-test-type/laboratory-test-type.component';
import { OutPatientComponent } from './components/out-patient/out-patient.component';
import { AllergyComponent } from './components/patient/allergy/allergy.component';
import { MedicalCertificatesComponent } from './components/patient/medical-certificates/medical-certificates.component';
import { MedicalCertificatePrintComponent } from './components/patient/medical-certificates/print-modal/print-medical-certificate.component';
import { MedicalHistoryDrugComponent } from './components/patient/medical-history-drug/medical-history-drug.component';
import { MedicalHistoryFamilyComponent } from './components/patient/medical-history-family/medical-history-family.component';
import { MedicalHistoryComponent } from './components/patient/medical-history/medical-history.component';
import { MedicalInterviewAllergiesComponent } from './components/patient/medical-interview-allergies/medical-interview-allergies.component';
import { MedicalInterviewSocratesComponent } from './components/patient/medical-interview-socrates/medical-interview-socrates.component';
import { PatientDetailComponent } from './components/patient/patient-detail/patient-detail.component';
import { PreExamCheckUpComponent } from './components/patient/pre-exam-check-up/pre-exam-check-up.component';
import { ResponsiblePersonComponent } from './components/patient/responsible-person/responsible-person.component';
import { MedicationComponent } from './components/pharmacy/medication/medication.component';
import { MedicineCategoriesComponent } from './components/pharmacy/medicine-categories/medicine-categories.component';
import { MedicineStockHospitalComponent } from './components/pharmacy/medicine-stock-hospital/medicine-stock-hospital.component';
import { MedicineSupplierComponent } from './components/pharmacy/medicine-supplier/medicine-supplier.component';
import { PharmacyMedStockComponent } from './components/pharmacy/pharmacy-med-stock/pharmacy-med-stock.component';
import { PharmacySalesComponent } from './components/pharmacy/pharmacy-sales/pharmacy-sales.component';
import { PharmacyComponent } from './components/pharmacy/pharmacy.component';
import { PrescriptionComponent } from './components/pharmacy/prescription/prescription.component';
import { VaccineComponent } from './components/pharmacy/vaccine/vaccine.component';
import { RadiologyComponent } from './components/radiology/radiology.component';
import { AllowanceDeductionTypeComponent } from './components/settings/allowance-deduction-type/allowance-deduction-type.component';
import { AllowanceDeductionComponent } from './components/settings/allowance-deduction/allowance-deduction.component';
import { DesignationsComponent } from './components/settings/general-setting/designations/designations.component';
import { EducationLevelComponent } from './components/settings/general-setting/education-level/education-level.component';
import { EmployeeRolesComponent } from './components/settings/general-setting/employee-roles/employee-roles.component';
import { GeneralSettingComponent } from './components/settings/general-setting/general-setting.component';
import { MedicalDepartmentComponent } from './components/settings/general-setting/medical-department/medical-department.component';
import { PermissionComponent } from './components/settings/general-setting/permission/permission.component';
import { SpecializationComponent } from './components/settings/general-setting/specialization/specialization.component';
import { LanguageComponent } from './components/settings/language/language.component';
import { PatientComponent } from './components/settings/patient/patient.component';
import { TaxRuleComponent } from './components/settings/tax-rule/tax-rule.component';
import { EmailSmsSetupComponent } from './components/utilities/email-sms-setup/email-sms-setup.component';
import { NoticeComponent } from './components/utilities/notice/notice.component';
import { ViewNoticeComponent } from './components/utilities/notice/view-notice/view-notice.component';
// import { MessagesComponent } from './components/utilities/notification/messages/messages.component';
import { NotificationComponent } from './components/utilities/notification/notification.component';
import { PaymentOptionComponent } from './components/utilities/payment-option/payment-option.component';
import { BuildingComponent } from './components/ward/building/building.component';
import { RoomComponent } from './components/ward/room/room.component';
import { WardComponent } from './components/ward/ward.component';
import { WardtypeComponent } from './components/ward/wardtype/wardtype.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'bill-schedules',
    component: BillScheduleComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'pre-exam-checkups',
    component: PreExamCheckUpComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'appointments',
    component: AppointmentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'schedules',
    component: ScheduleComponent,
    canActivate: [AuthGuard],
  },
  { path: 'ipds', component: InPatientComponent, canActivate: [AuthGuard] },
  { path: 'opds', component: OutPatientComponent, canActivate: [AuthGuard] },
  { path: 'pharmacy', component: PharmacyComponent, canActivate: [AuthGuard] },
  {
    path: 'radiology',
    component: RadiologyComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'employee-list',
    component: EmployeeComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'inventories',
    component: InventoryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'inventory-suppliers',
    component: InventorySupplierComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'pharmacy-expenses',
    component: PharmacyExpenseComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'pharmacy-expense-categories',
    component: PharmacyExpenseCategoryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'expenses',
    component: ExpenseComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'expense-categories',
    component: ExpenseCategoryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'revenues',
    component: RevenueComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'revenue-categories',
    component: RevenueCategoryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'payroll-reports',
    component: PayrollReportComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'allowance-deductions',
    component: AllowanceDeductionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'bill-laboratories',
    component: BillLaboratoryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'notification-messages',
    component: NotificationComponent,
    canActivate: [AuthGuard],
  },
  // {
  //   path: 'messages',
  //   component: MessagesComponent,
  //   canActivate: [AuthGuard],
  // },
  {
    path: 'notification-messages/:id',
    component: NotificationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'patient-details/:patientId',
    component: PatientDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'laboratoy-requests',
    component: LabRequestComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'laboratoy-test-categories',
    component: LaboratoryTestCategoryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'laboratoy-test-results',
    component: LabTestResultComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'laboratoy-test-types',
    component: LaboratoryTestTypeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'medical-history-drug',
    component: MedicalHistoryDrugComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'medical-history-families',
    component: MedicalHistoryFamilyComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'medical-certificates',
    component: MedicalCertificatesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'medical-interview-allergies',
    component: MedicalInterviewAllergiesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'medicine-stock-hospitals',
    component: MedicineStockHospitalComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'medical-histories',
    component: MedicalHistoryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'medical-interview-socrates',
    component: MedicalInterviewSocratesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'patient-schedules',
    component: PatientScheduleComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'responsible-person',
    component: ResponsiblePersonComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-admission',
    component: AdmissionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admission-types',
    component: AdmissionTypeComponent,
    canActivate: [AuthGuard],
  },
  { path: 'languages', component: LanguageComponent, canActivate: [AuthGuard] },
  {
    path: 'payment-options',
    component: PaymentOptionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'bed/available-beds/:avaBedsId',
    component: BedComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'bed',
    component: BedComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'available',
        component: AvailableComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'bed-allotment',
        component: BedAllotmentComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'bed-type',
        component: BedtypeComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'new-patients',
    component: PatientComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'email-sms-setups',
    component: EmailSmsSetupComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'general-settings',
    component: GeneralSettingComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] },
    children: [
      {
        path: 'designations',
        component: DesignationsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'specializations',
        component: SpecializationComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'permissions',
        component: PermissionComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'employee-roles',
        component: EmployeeRolesComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'education-level',
        component: EducationLevelComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'medical-departments',
        component: MedicalDepartmentComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'ward',
    component: WardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'ward-type',
        component: WardtypeComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'building',
        component: BuildingComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'room',
        component: RoomComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'pharmacy',
    component: PharmacyComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'tax-rules',
    component: TaxRuleComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'notices',
    component: NoticeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'medications',
    component: MedicationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'medicine-categories',
    component: MedicineCategoriesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'medicine-suppliers',
    component: MedicineSupplierComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'prescription',
    component: PrescriptionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'pharmacy-sales',
    component: PharmacySalesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'pharmacy-medicine-stocks',
    component: PharmacyMedStockComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'vaccines',
    component: VaccineComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'service-charges',
    component: ServiceChargeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'allergies',
    component: AllergyComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'blood-groups',
    component: BloodGroupComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'blood-group-status',
    component: BloodGroupStatusComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'donors',
    component: DonorComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'employee-profile/:employeeId',
    component: EmployeeProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'ipd-details/:patientId',
    component: IpdDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'view-notice-detail/:id',
    component: ViewNoticeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admission-details/:admissionId',
    component: AdmissionDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'employee-details/:employeeId',
    component: EmployeeDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'print-medical-certificate/:id',
    component: MedicalCertificatePrintComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'patient-schedule-details/:patientScheduleId',
    component: PatientScheduleDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'unpaid-patient-schedules',
    component: UnpaidPatientScheduleComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'paid-patient-schedules',
    component: PaidPatientScheduleComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'allowance-deduction-types',
    component: AllowanceDeductionTypeComponent,
    canActivate: [AuthGuard],
  },
  { path: '404', component: Error404Component },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
