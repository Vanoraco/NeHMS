import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiPaths } from 'src/app/enum/api-paths';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  BASE_URL = environment.baseUrl;
  JSON_URL = environment.jsonUrl;
  constructor(private httpClient: HttpClient) {}

  //get Languages list
  getLanguages(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.LanguageEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //get Languages list
  getLanguagesById(id: number | string): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.LanguageEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  //get BloodGroup list
  getBloodGroupApi(): Observable<any[]> {
    return this.httpClient.get<any>(
      this.BASE_URL + ApiPaths.BloodGroupEndpoint
    );
  }
  //get BloodGroup list
  getBloodGroupByIdApi(id: number | string): Observable<any[]> {
    return this.httpClient.get<any>(
      this.BASE_URL + ApiPaths.BloodGroupEndpoint + `/${id}`
    );
  }

  //get Genders list
  getGenders(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.GenderEndpoint)
      .pipe(catchError(this.errorHandler));
  }

  //get Countries list
  getCountries(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.CountryEndpoint)
      .pipe(catchError(this.errorHandler));
  }

  //get Cities list
  getCities(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.CitieEndpoint)
      .pipe(catchError(this.errorHandler));
  }

  //get MaritalStatuses list
  getMaritalStatuses(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.MaritalStatuseEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //get EmployeeeRole list
  getEmployeeRole(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.EmployeeRoleEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //get Designations list
  getDesignations(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.DesignationEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //get MedicalDepartments list
  getMedicalDepartments(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.MedicalDepartmentEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //get Specializations list
  getSpecializations(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.SpecializationEndPoint)
      .pipe(catchError(this.errorHandler));
  }
  //get EducationLevel list
  getEducationLevels(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.EducationLevelEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //post Add Employee
  addEmployeeApi(employee: any): Observable<any> {
    return this.httpClient
      .post(this.BASE_URL + ApiPaths.EmployeeEndpoint, employee)
      .pipe(catchError(this.errorHandler));
  }

  //View list of Employee
  getEmployeeApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.EmployeeEndpoint)
      .pipe(catchError(this.errorHandler));
  }

  //View Employee by id
  getEmployeeByIdApi(id: number | string): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.EmployeeEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  //update Employee
  updateEmployeeApi(id: number | string, Employee: any): Observable<any> {
    return this.httpClient
      .put(this.BASE_URL + ApiPaths.EmployeeEndpoint + `/${id}`, Employee)
      .pipe(catchError(this.errorHandler));
  }

  //Delete Employee by id
  deleteEmployeeApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.EmployeeEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }
  //View list of Patient
  getPatientApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.PatientEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //View list of AdmissionType
  getAdmissionTypeApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.AdmissionTypeEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //View list of ServiceCharge
  getServiceChargeApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.ServiceChargeEndpoint)
      .pipe(catchError(this.errorHandler));
  }

  //post Add AppointmentDuration
  addAppointmentDurationApi(AppointmentDuration: any): Observable<any> {
    return this.httpClient
      .post(
        this.BASE_URL + ApiPaths.AppointmentDurationEndpoint,
        AppointmentDuration
      )
      .pipe(catchError(this.errorHandler));
  }
  //View list of AppointmentDuration
  getAppointmentDurationApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.AppointmentDurationEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //View AppointmentDuration by id
  updateAppointmentDurationApi(
    id: number | string,
    AppointmentDuration: any
  ): Observable<any> {
    return this.httpClient
      .put(
        this.BASE_URL + ApiPaths.AppointmentDurationEndpoint + `/${id}`,
        AppointmentDuration
      )
      .pipe(catchError(this.errorHandler));
  }
  //Delete AppointmentDuration by id
  deleteAppointmentDurationApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.AppointmentDurationEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }
  //post Add EmployeeRole
  addEmployeeRoleApi(EmployeeRole: any): Observable<any> {
    return this.httpClient
      .post(this.BASE_URL + ApiPaths.EmployeeRoleEndpoint, EmployeeRole)
      .pipe(catchError(this.errorHandler));
  }
  //View list of EmployeeRole
  getEmployeeRoleApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.EmployeeRoleEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //View list of EmployeeRole
  getEmployeeRoleByIdApi(id: number | string): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.EmployeeRoleEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }
  //View EmployeeRole by id
  updateEmployeeRoleApi(
    id: number | string,
    EmployeeRole: any
  ): Observable<any> {
    return this.httpClient
      .put(
        this.BASE_URL + ApiPaths.EmployeeRoleEndpoint + `/${id}`,
        EmployeeRole
      )
      .pipe(catchError(this.errorHandler));
  }
  //Delete EmployeeRole by id
  deleteEmployeeRoleApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.EmployeeRoleEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  //post Add  EmployeeSalary
  addEmployeeSalaryApi(EmployeeSalary: any): Observable<any> {
    return this.httpClient
      .post(this.BASE_URL + ApiPaths.EmployeeSalaryEndpoint, EmployeeSalary)
      .pipe(catchError(this.errorHandler));
  }
  //View list of  EmployeeSalary
  getEmployeeSalaryApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.EmployeeSalaryEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //View list of  EmployeeSalary
  getEmployeeSalaryByIdApi(id: number): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.EmployeeSalaryEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }
  //View  EmployeeSalary by id
  updateEmployeeSalaryApi(
    id: number | string,
    EmployeeSalary: any
  ): Observable<any> {
    return this.httpClient
      .put(
        this.BASE_URL + ApiPaths.EmployeeSalaryEndpoint + `/${id}`,
        EmployeeSalary
      )
      .pipe(catchError(this.errorHandler));
  }
  //Delete  EmployeeSalary by id
  deleteEmployeeSalaryApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.EmployeeSalaryEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  //post Add   AllowanceDeduction
  addAllowanceDeductionApi(AllowanceDeduction: any): Observable<any> {
    return this.httpClient
      .post(
        this.BASE_URL + ApiPaths.AllowanceDeductionEndpoint,
        AllowanceDeduction
      )
      .pipe(catchError(this.errorHandler));
  }
  //View list of   AllowanceDeduction
  getAllowanceDeductionApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.AllowanceDeductionEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //View   AllowanceDeduction by id
  updateAllowanceDeductionApi(
    id: number | string,
    AllowanceDeduction: any
  ): Observable<any> {
    return this.httpClient
      .put(
        this.BASE_URL + ApiPaths.AllowanceDeductionEndpoint + `/${id}`,
        AllowanceDeduction
      )
      .pipe(catchError(this.errorHandler));
  }
  //Delete   AllowanceDeduction by id
  deleteAllowanceDeductionApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.AllowanceDeductionEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }
  //post Add  AllowanceDeductionType
  addAllowanceDeductionTypeApi(AllowanceDeductionType: any): Observable<any> {
    return this.httpClient
      .post(
        this.BASE_URL + ApiPaths.AllowanceDeductionTypeEndpoint,
        AllowanceDeductionType
      )
      .pipe(catchError(this.errorHandler));
  }
  //View list of  AllowanceDeductionType
  getAllowanceDeductionTypeApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.AllowanceDeductionTypeEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //View  AllowanceDeductionType by id
  updateAllowanceDeductionTypeApi(
    id: number | string,
    AllowanceDeductionType: any
  ): Observable<any> {
    return this.httpClient
      .put(
        this.BASE_URL + ApiPaths.AllowanceDeductionTypeEndpoint + `/${id}`,
        AllowanceDeductionType
      )
      .pipe(catchError(this.errorHandler));
  }
  //Delete  AllowanceDeductionType by id
  deleteAllowanceDeductionTypeApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(
        this.BASE_URL + ApiPaths.AllowanceDeductionTypeEndpoint + `/${id}`
      )
      .pipe(catchError(this.errorHandler));
  }
  //post Add  NotificationMessage
  addNotificationMessageApi(NotificationMessage: any): Observable<any> {
    return this.httpClient
      .post(
        this.BASE_URL + ApiPaths.NotificationEndpoint,
        NotificationMessage
      )
      .pipe(catchError(this.errorHandler));
  }
  //View list of  NotificationMessage
  getNotificationMessageApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.NotificationEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //View  NotificationMessage by id
  updateNotificationMessageApi(
    id: number | string,
    NotificationMessage: any
  ): Observable<any> {
    return this.httpClient
      .put(
        this.BASE_URL + ApiPaths.NotificationEndpoint + `/${id}`,
        NotificationMessage
      )
      .pipe(catchError(this.errorHandler));
  }
  //Delete  NotificationMessage by id
  deleteNotificationMessageApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.NotificationEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }
  //post Add  Message
  addMessageApi(Message: any): Observable<any> {
    return this.httpClient
      .post(this.JSON_URL + ApiPaths.MessageEndpoint, Message)
      .pipe(catchError(this.errorHandler));
  }
  //View list of  Message
  getMessageApi(): Observable<any> {
    return this.httpClient
      .get(this.JSON_URL + ApiPaths.MessageEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //View  Message by id
  updateMessageApi(id: number | string, Message: any): Observable<any> {
    return this.httpClient
      .put(this.JSON_URL + ApiPaths.MessageEndpoint + `/${id}`, Message)
      .pipe(catchError(this.errorHandler));
  }
  //Delete  Message by id
  deleteMessageApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.JSON_URL + ApiPaths.MessageEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }
  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
