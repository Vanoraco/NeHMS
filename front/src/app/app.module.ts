import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpClient,
} from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { OutPatientComponent } from './components/out-patient/out-patient.component';
import { PharmacyComponent } from './components/pharmacy/pharmacy.component';
import { RadiologyComponent } from './components/radiology/radiology.component';
import { GeneralSettingComponent } from './components/settings/general-setting/general-setting.component';
import { LanguageComponent } from './components/settings/language/language.component';
import { AuthGuard } from './auth.guard';
import { NgToastModule } from 'ng-angular-popup';
import { EmployeeService } from './services/employee.service';
import { Error404Component } from './components/auth/error404/error404.component';
import { WardComponent } from './components/ward/ward.component';
import { BedService } from './services/bed.service';
import { BuildingComponent } from './components/ward/building/building.component';
import { AddEditBuildingComponent } from './components/ward/building/add-edit-building/add-edit-building.component';
import { AvailableComponent } from './components/bed/available/available.component';
import { AddEditAvailableComponent } from './components/bed/available/add-edit-available/add-edit-available.component';
import { RoomComponent } from './components/ward/room/room.component';
import { AddEditRoomComponent } from './components/ward/room/add-edit-room/add-edit-room.component';
import { AddEditWardComponent } from './components/ward/add-edit-ward/add-edit-ward.component';
import { WardtypeComponent } from './components/ward/wardtype/wardtype.component';
import { AddEditWardtypeComponent } from './components/ward/wardtype/add-edit-wardtype/add-edit-wardtype.component';
import { AdmissionComponent } from './components/admission/admission.component';
import { MedicineCategoriesComponent } from './components/pharmacy/medicine-categories/medicine-categories.component';
import { PrescriptionComponent } from './components/pharmacy/prescription/prescription.component';
import { MedicationComponent } from './components/pharmacy/medication/medication.component';
import { MedicineSupplierComponent } from './components/pharmacy/medicine-supplier/medicine-supplier.component';
import { PharmacyService } from './services/pharmacy.service';
import { AdmissionService } from './services/admission.service';
import { MedicineCategoryFormComponent } from './components/pharmacy/medicine-categories/medicine-category-form/medicine-category-form.component';
import { MedicationFormComponent } from './components/pharmacy/medication/medication-form/medication-form.component';
import { MedsupplierFormComponent } from './components/pharmacy/medicine-supplier/medsupplier-form/medsupplier-form.component';
import { PharmacyMedStockComponent } from './components/pharmacy/pharmacy-med-stock/pharmacy-med-stock.component';
import { PharmacyMedstockFormComponent } from './components/pharmacy/pharmacy-med-stock/pharmacy-medstock-form/pharmacy-medstock-form.component';
import { PharmacySalesComponent } from './components/pharmacy/pharmacy-sales/pharmacy-sales.component';
import { PharmacySalesFormComponent } from './components/pharmacy/pharmacy-sales/pharmacy-sales-form/pharmacy-sales-form.component';
import { PrescriptionFormComponent } from './components/pharmacy/prescription/prescription-form/prescription-form.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { InventorySupplierComponent } from './components/inventory/inventory-supplier/inventory-supplier.component';
import { InventorySupplierFormComponent } from './components/inventory/inventory-supplier/inventory-supplier-form/inventory-supplier-form.component';
import { InventoryFormComponent } from './components/inventory/inventory-form/inventory-form.component';
import { LabRequestComponent } from './components/laboratory/lab-request/lab-request.component';
import { LaboratoryTestCategoryComponent } from './components/laboratory/laboratory-test-category/laboratory-test-category.component';
import { LaboratoryTestTypeComponent } from './components/laboratory/laboratory-test-type/laboratory-test-type.component';
import { LaboratoryTestCategoryFormComponent } from './components/laboratory/laboratory-test-category/laboratory-test-category-form/laboratory-test-category-form.component';
import { LaboratoryTestTypeFormComponent } from './components/laboratory/laboratory-test-type/laboratory-test-type-form/laboratory-test-type-form.component';
import { MedicalHistoryComponent } from './components/patient/medical-history/medical-history.component';
import { MedicalHistoryDrugComponent } from './components/patient/medical-history-drug/medical-history-drug.component';
import { MedicalHistoryDrugFormComponent } from './components/patient/medical-history-drug/medical-history-drug-form/medical-history-drug-form.component';
import { MedicalHistoryFormComponent } from './components/patient/medical-history/medical-history-form/medical-history-form.component';
import { LabRequestFormComponent } from './components/laboratory/lab-request/lab-request-form/lab-request-form.component';
import { PayrollComponent } from './components/billing/payroll-report/payroll.component';
import { PayrollFormComponent } from './components/billing/payroll-report/payroll-form/payroll-form.component';
import { MedicalInterviewSocratesComponent } from './components/patient/medical-interview-socrates/medical-interview-socrates.component';
import { MedicalInterviewSocratesFormComponent } from './components/patient/medical-interview-socrates/medical-interview-socrates-form/medical-interview-socrates-form.component';
import { BillLaboratoryComponent } from './components/billing/bill-laboratory/bill-laboratory.component';
import { BillLaboratoryFormComponent } from './components/billing/bill-laboratory/bill-laboratory-form/bill-laboratory-form.component';
import { AppointmentFormComponent } from './components/appointment/appointment-form/appointment-form.component';
import { CaseComponent } from './components/patient/case/case.component';
import { CaseFormComponent } from './components/patient/case/case-form/case-form.component';
import { MedicineStockHospitalComponent } from './components/pharmacy/medicine-stock-hospital/medicine-stock-hospital.component';
import { MedicineStockHospitalFormComponent } from './components/pharmacy/medicine-stock-hospital/medicine-stock-hospital-form/medicine-stock-hospital-form.component';
import { VaccineComponent } from './components/pharmacy/vaccine/vaccine.component';
import { VaccineFormComponent } from './components/pharmacy/vaccine/vaccine-form/vaccine-form.component';
import { ScheduleComponent } from './components/appointment/schedule/schedule.component';
import { ScheduleFormComponent } from './components/appointment/schedule/schedule-form/schedule-form.component';
import { PermissionComponent } from './components/settings/general-setting/permission/permission.component';
import { PermissionFormComponent } from './components/settings/general-setting/permission/permission-form/permission-form.component';
import { SpecializationComponent } from './components/settings/general-setting/specialization/specialization.component';
import { SpecializationFormComponent } from './components/settings/general-setting/specialization/specialization-form/specialization-form.component';
import { ResponsiblePersonComponent } from './components/patient/responsible-person/responsible-person.component';
import { ResponsiblePersonFormComponent } from './components/patient/responsible-person/responsible-person-form/responsible-person-form.component';
import { EducationLevelComponent } from './components/settings/general-setting/education-level/education-level.component';
import { AddEditEducationlevelComponent } from './components/settings/general-setting/education-level/add-edit-educationlevel/add-edit-educationlevel.component';
import { PatientComponent } from './components/settings/patient/patient.component';
import { PatientFormComponent } from './components/settings/patient/patient-form/patient-form.component';
import { PatientService } from './services/patient.service';
import { SettingService } from './services/setting.service';
import { ExpenseService } from './services/expense.service';
import { BillingService } from './services/billing.service';
import { LaboratoryService } from './services/laboratory.service';
import { RevenueService } from './services/revenue.service';
import { AdmissionTypeComponent } from './components/admission/admission-type/admission-type.component';
import { AdmissionTypeFormComponent } from './components/admission/admission-type/admission-type-form/admission-type-form.component';
import { InPatientFormComponent } from './components/in-patient/in-patient-form/in-patient-form.component';
import { InPatientComponent } from './components/in-patient/in-patient.component';
import { IpdDetailComponent } from './components/in-patient/ipd-detail/ipd-detail.component';
import { EmployeeRolesComponent } from './components/settings/general-setting/employee-roles/employee-roles.component';
import { AddEditEmployeeRolesComponent } from './components/settings/general-setting/employee-roles/add-edit-employee-roles/add-edit-employee-roles.component';
import { EmergencyFormComponent } from './components/settings/patient/emergency-form/emergency-form.component';
import { BillScheduleComponent } from './components/billing/bill-schedule.component';
import { BillScheduleFormComponent } from './components/billing/bill-schedule-form/bill-schedule-form.component';
import { AdmissionFormComponent } from './components/admission/admission-form/admission-form.component';
import { BillLabComponent } from './components/laboratory/lab-request/bill-lab/bill-lab.component';
import { CalanderComponent } from './components/appointment/calander/calander.component';
import {
  ScheduleModule,
  RecurrenceEditorModule,
  DayService,
  WeekService,
  WorkWeekService,
  MonthService,
} from '@syncfusion/ej2-angular-schedule';
import { PrintModalComponent } from './components/pharmacy/pharmacy-sales/print-modal/print-modal.component';
import { BillPrintModalComponent } from './components/billing/bill-print-modal/bill-print-modal.component';
import { BillLabPrintModalComponent } from './components/billing/bill-laboratory/bill-lab-print-modal/bill-lab-print-modal.component';
import { WebcamModule } from 'ngx-webcam';
import { LabTestResultComponent } from './components/laboratory/lab-test-result/lab-test-result.component';
import { LabtestResultFormComponent } from './components/laboratory/lab-test-result/labtest-result-form/labtest-result-form.component';
import { EmployeSalaryComponent } from './components/settings/employe-salary/employe-salary.component';
import { AddEditEmployeeSalaryComponent } from './components/settings/employe-salary/add-edit-employee-salary/add-edit-employee-salary.component';
import { AllowanceDeductionComponent } from './components/settings/allowance-deduction/allowance-deduction.component';
import { AddEditAllowanceDeductionComponent } from './components/settings/allowance-deduction/add-edit-allowance-deduction/add-edit-allowance-deduction.component';
import { TaxRuleComponent } from './components/settings/tax-rule/tax-rule.component';
import { AddEditTaxRuleComponent } from './components/settings/tax-rule/add-edit-tax-rule/add-edit-tax-rule.component';
import { AllowanceDeductionTypeComponent } from './components/settings/allowance-deduction-type/allowance-deduction-type.component';
import { AddEditAllowanceDeductionTypeComponent } from './components/settings/allowance-deduction-type/add-edit-allowance-deduction-type/add-edit-allowance-deduction-type.component';
import { MedicalDepartmentComponent } from './components/settings/general-setting/medical-department/medical-department.component';
import { AddEditMedicalDepartmentComponent } from './components/settings/general-setting/medical-department/add-edit-medical-department/add-edit-medical-department.component';
import { ServiceChargeComponent } from './components/billing/service-charge/service-charge.component';
import { AddEditServiceChargeComponent } from './components/billing/service-charge/add-edit-service-charge/add-edit-service-charge.component';
import { RecommendationsComponent } from './components/patient/recommendations/recommendations.component';
import { AddEditRecommendationsComponent } from './components/patient/recommendations/add-edit-recommendations/add-edit-recommendations.component';
import { MedicalHistoryFamilyComponent } from './components/patient/medical-history-family/medical-history-family.component';
import { AddEditMedicalHistoryFamilyComponent } from './components/patient/medical-history-family/add-edit-medical-history-family/add-edit-medical-history-family.component';
import { MedicalCertificatesComponent } from './components/patient/medical-certificates/medical-certificates.component';
import { AddEditMedicalCertificatesComponent } from './components/patient/medical-certificates/add-edit-medical-certificates/add-edit-medical-certificates.component';
import { MedicalInterviewAllergiesComponent } from './components/patient/medical-interview-allergies/medical-interview-allergies.component';
import { MedicalCertificatePrintComponent } from './components/patient/medical-certificates/print-modal/print-medical-certificate.component';
import { AddEditMedicalInterviewAllergiesComponent } from './components/patient/medical-interview-allergies/add-edit-medical-interview-allergies/add-edit-medical-interview-allergies.component';
import { OperationComponent } from './components/patient/operation/operation.component';
import { OperationFormComponent } from './components/patient/operation/operation-form/operation-form.component';
import { BloodGroupComponent } from './components/blood-bank/blood-group/blood-group.component';
import { BloodGroupStatusComponent } from './components/blood-bank/blood-group-status/blood-group-status.component';
import { BloodgroupStatusFormComponent } from './components/blood-bank/blood-group-status/bloodgroup-status-form/bloodgroup-status-form.component';
import { BloodGroupFormComponent } from './components/blood-bank/blood-group/blood-group-form/blood-group-form.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { EmployeeProfileComponent } from './components/human-resource/employees-profile/employees-profile.component';
import { PharmacyExpenseComponent } from './components/finance/expense/pharmacy-expense/pharmacy-expense.component';
import { PharmacyExpenseCategoryComponent } from './components/finance/expense/pharmacy-expense-category/pharmacy-expense-category.component';
import { PhaexpenseCategoryFormComponent } from './components/finance/expense/pharmacy-expense-category/phaexpense-category-form/phaexpense-category-form.component';
import { PharmacyExpenseFormComponent } from './components/finance/expense/pharmacy-expense/pharmacy-expense-form/pharmacy-expense-form.component';
import { RevenueComponent } from './components/finance/revenue/revenue.component';
import { RevenueCategoryComponent } from './components/finance/revenue/revenue-category/revenue-category.component';
import { ExpenseComponent } from './components/finance/expense/expense/expense.component';
import { ExpenseCategoryComponent } from './components/finance/expense/expense-category/expense-category.component';
import { ExpenseCategoryFormComponent } from './components/finance/expense/expense-category/expense-category-form/expense-category-form.component';
import { ExpenseFormComponent } from './components/finance/expense/expense/expense-form/expense-form.component';
import { RevenueFormComponent } from './components/finance/revenue/revenue-form/revenue-form.component';
import { RevenueCategoryFormComponent } from './components/finance/revenue/revenue-category/revenue-category-form/revenue-category-form.component';
import { PatientScheduleComponent } from './components/appointment/patient-schedule/patient-schedule.component';
import { PatientScheduleFormComponent } from './components/appointment/patient-schedule/patient-schedule-form/patient-schedule-form.component';
import { PayrollReportComponent } from './components/finance/payroll/payroll-report/payroll-report.component';
import { PayrollReportFormComponent } from './components/finance/payroll/payroll-report/payroll-report-form/payroll-report-form.component';
import { EmployeeComponent } from './components/human-resource/employee/employee.component';
import { EmployeeFormComponent } from './components/human-resource/employee/employee-form/employee-form.component';
import { PaymentOptionComponent } from './components/utilities/payment-option/payment-option.component';
import { PreExamCheckUpComponent } from './components/patient/pre-exam-check-up/pre-exam-check-up.component';
import { AddEditPreExamCheckUpComponent } from './components/patient/pre-exam-check-up/add-edit-pre-exam-check-up/add-edit-pre-exam-check-up.component';
import { AdmissionDetailComponent } from './components/admission/admission-detail/admission-detail.component';
import { AccPatientscheduleFormComponent } from './components/appointment/patient-schedule/acc-patientschedule-form/acc-patientschedule-form.component';
import { PatientScheduleDetailComponent } from './components/appointment/patient-schedule/patient-schedule-detail/patient-schedule-detail.component';
import { PaidPatientScheduleComponent } from './components/appointment/patient-schedule/paid-patient-schedule/paid-patient-schedule.component';
import { UnpaidPatientScheduleComponent } from './components/appointment/patient-schedule/unpaid-patient-schedule/unpaid-patient-schedule.component';
import { AddbillscheduleFormComponent } from './components/appointment/patient-schedule/patient-schedule-detail/addbillschedule-form/addbillschedule-form.component';
import { BirthComponent } from './components/patient/birth/birth.component';
import { ModalAddAllowanceDeductionComponent } from './components/billing/payroll-report/modal-add-allowance-deduction/modal-add-allowance-deduction.component';
import { AddEditDonorComponent } from './components/blood-bank/donor/add-edit-donor/add-edit-donor.component';
import { DonorComponent } from './components/blood-bank/donor/donor.component';
import { EmployeeDetailComponent } from './components/human-resource/employee/employee-detail/employee-detail.component';
import { AddEditAllergyComponent } from './components/patient/allergy/add-edit-allergy/add-edit-allergy.component';
import { AllergyComponent } from './components/patient/allergy/allergy.component';
import { AddEditBirthComponent } from './components/patient/birth/add-edit-birth/add-edit-birth.component';
import { AddEditDeathComponent } from './components/patient/death/add-edit-death/add-edit-death.component';
import { DeathComponent } from './components/patient/death/death.component';
import { PatientDetailComponent } from './components/patient/patient-detail/patient-detail.component';
import { AddEditDesignationsComponent } from './components/settings/general-setting/designations/add-edit-designations/add-edit-designations.component';
import { DesignationsComponent } from './components/settings/general-setting/designations/designations.component';
import { AddEditHolidayComponent } from './components/utilities/holiday/add-edit-holiday/add-edit-holiday.component';
import { HolidayComponent } from './components/utilities/holiday/holiday.component';
import { NoticeFormComponent } from './components/utilities/notice/notice-form/notice-form.component';
import { NoticeComponent } from './components/utilities/notice/notice.component';
import { ViewNoticeComponent } from './components/utilities/notice/view-notice/view-notice.component';
// import { MessagesComponent } from './components/utilities/notification/messages/messages.component';
import { NotificationFormComponent } from './components/utilities/notification/notification-form/notification-form.component';
import { NotificationComponent } from './components/utilities/notification/notification.component';
import { AddEditOvertimeComponent } from './components/utilities/overtime/add-edit-overtime/add-edit-overtime.component';
import { OvertimeComponent } from './components/utilities/overtime/overtime.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { AuthService } from './services/auth.service';
import { BedModule } from './components/bed/bed.module';
import { PrimeNgModule } from './primeng.module';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DashboardComponent,
    EmployeeProfileComponent,
    LoginComponent,
    BillScheduleComponent,
    AppointmentComponent,
    OutPatientComponent,
    PharmacyComponent,
    RadiologyComponent,
    EducationLevelComponent,
    EducationLevelComponent,
    AddEditEducationlevelComponent,
    GeneralSettingComponent,
    LanguageComponent,
    Error404Component,
    WardComponent,
    BuildingComponent,
    AddEditBuildingComponent,
    AvailableComponent,
    AddEditAvailableComponent,
    RoomComponent,
    AddEditRoomComponent,
    AddEditWardComponent,
    AddEditWardComponent,
    WardtypeComponent,
    AddEditWardtypeComponent,
    AdmissionComponent,
    MedicineCategoriesComponent,
    PrescriptionComponent,
    MedicationComponent,
    MedicineSupplierComponent,
    MedicineCategoryFormComponent,
    MedicationFormComponent,
    MedsupplierFormComponent,
    PharmacyMedStockComponent,
    PharmacyMedstockFormComponent,
    PharmacySalesComponent,
    PharmacySalesFormComponent,
    PrescriptionFormComponent,
    PharmacyExpenseComponent,
    PharmacyExpenseCategoryComponent,
    PhaexpenseCategoryFormComponent,
    PharmacyExpenseFormComponent,
    InventoryComponent,
    InventorySupplierComponent,
    InventorySupplierFormComponent,
    InventoryFormComponent,
    RevenueComponent,
    RevenueCategoryComponent,
    ExpenseComponent,
    ExpenseCategoryComponent,
    ExpenseCategoryFormComponent,
    ExpenseFormComponent,
    RevenueFormComponent,
    RevenueCategoryFormComponent,
    LabRequestComponent,
    LaboratoryTestCategoryComponent,
    LaboratoryTestTypeComponent,
    LaboratoryTestCategoryFormComponent,
    LaboratoryTestTypeFormComponent,
    MedicalHistoryComponent,
    MedicalHistoryDrugComponent,
    MedicalHistoryDrugFormComponent,
    MedicalHistoryFormComponent,
    PatientScheduleComponent,
    PatientScheduleFormComponent,
    LabRequestFormComponent,
    PayrollComponent,
    PayrollFormComponent,
    PayrollReportComponent,
    PayrollReportFormComponent,
    MedicalInterviewSocratesComponent,
    MedicalInterviewSocratesFormComponent,
    EmployeeComponent,
    EmployeeFormComponent,
    BillLaboratoryComponent,
    BillLaboratoryFormComponent,
    AppointmentFormComponent,
    CaseComponent,
    CaseFormComponent,
    MedicineStockHospitalComponent,
    MedicineStockHospitalFormComponent,
    VaccineComponent,
    VaccineFormComponent,
    ScheduleComponent,
    ScheduleFormComponent,
    PaymentOptionComponent,
    PermissionComponent,
    PermissionFormComponent,
    SpecializationComponent,
    SpecializationFormComponent,
    ResponsiblePersonComponent,
    ResponsiblePersonFormComponent,
    PatientComponent,
    PatientFormComponent,
    AdmissionTypeComponent,
    AdmissionTypeFormComponent,
    InPatientFormComponent,
    InPatientComponent,
    IpdDetailComponent,
    EmployeeRolesComponent,
    AddEditEmployeeRolesComponent,
    EmergencyFormComponent,
    BillScheduleFormComponent,
    AdmissionFormComponent,
    PreExamCheckUpComponent,
    AddEditPreExamCheckUpComponent,
    AdmissionDetailComponent,
    AccPatientscheduleFormComponent,
    PatientScheduleDetailComponent,
    PaidPatientScheduleComponent,
    UnpaidPatientScheduleComponent,
    AddbillscheduleFormComponent,
    BillLabComponent,
    CalanderComponent,
    PrintModalComponent,
    BillPrintModalComponent,
    BillLabPrintModalComponent,
    LabTestResultComponent,
    LabtestResultFormComponent,
    EmployeSalaryComponent,
    AddEditEmployeeSalaryComponent,
    AllowanceDeductionComponent,
    AddEditAllowanceDeductionComponent,
    AllowanceDeductionTypeComponent,
    AddEditAllowanceDeductionTypeComponent,
    TaxRuleComponent,
    AddEditTaxRuleComponent,
    DesignationsComponent,
    AddEditDesignationsComponent,
    ModalAddAllowanceDeductionComponent,
    NotificationComponent,
    PatientDetailComponent,
    NotificationFormComponent,
    // MessagesComponent,
    EmployeeDetailComponent,
    BirthComponent,
    AddEditBirthComponent,
    DonorComponent,
    AddEditDonorComponent,
    DeathComponent,
    AddEditDeathComponent,
    HolidayComponent,
    AddEditHolidayComponent,
    MedicalDepartmentComponent,
    AddEditMedicalDepartmentComponent,
    ServiceChargeComponent,
    AddEditServiceChargeComponent,
    RecommendationsComponent,
    AddEditRecommendationsComponent,
    NoticeComponent,
    NoticeFormComponent,
    ViewNoticeComponent,
    OvertimeComponent,
    AddEditOvertimeComponent,
    MedicalHistoryComponent,
    MedicalHistoryFamilyComponent,
    AddEditMedicalHistoryFamilyComponent,
    MedicalCertificatesComponent,
    AddEditMedicalCertificatesComponent,
    MedicalInterviewAllergiesComponent,
    AddEditMedicalInterviewAllergiesComponent,
    MedicalCertificatePrintComponent,
    AllergyComponent,
    AddEditAllergyComponent,
    OperationComponent,
    OperationFormComponent,
    BloodGroupComponent,
    BloodGroupFormComponent,
    BloodGroupStatusComponent,
    BloodgroupStatusFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgToastModule,
    ScheduleModule,
    RecurrenceEditorModule,
    BrowserAnimationsModule,
    WebcamModule,
    BedModule,
    ToastrModule.forRoot(
      {
        timeOut: 6000,
        positionClass: 'toast-bottom-right',
        preventDuplicates: true,
      }
    ),
    PrimeNgModule,    
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    HttpClient,
    AuthGuard,
    AuthService,
    EmployeeService,
    BedService,
    PharmacyService,
    AdmissionService,
    PatientService,
    SettingService,
    ExpenseService,
    BillingService,
    LaboratoryService,
    RevenueService,
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
