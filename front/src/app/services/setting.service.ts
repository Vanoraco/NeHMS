import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiPaths } from '../enum/api-paths';
import { PaymentOption } from '../components/utilities/payment-option/add-edit-operations';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  BASE_URL = environment.baseUrl;
  // JSON_URL = environment.jsonUrl;
  constructor(private httpClient: HttpClient) {}

  //post Add PaymentOption
  addPaymentOptionApi(PaymentOption: any): Observable<any> {
    return this.httpClient
      .post(this.BASE_URL + ApiPaths.PaymentOptionEndpoint, PaymentOption)
      .pipe(catchError(this.errorHandler));
  }
  //View list of PaymentOption
  getPaymentOptionApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.PaymentOptionEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //View list of PaymentOption
  getPaymentOptionIdApi(id: number): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.PaymentOptionEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }
  //View PaymentOption by id
  updatePaymentOptionApi(paymentOption: PaymentOption): Observable<any> {
    return this.httpClient
      .put(
        this.BASE_URL + ApiPaths.PaymentOptionEndpoint + `/${paymentOption.id}`,
        paymentOption
      )
      .pipe(catchError(this.errorHandler));
  }
  //Delete PaymentOption by id
  deletePaymentOptionApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.PaymentOptionEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  //post Add Permission
  addPermissionApi(Permission: any): Observable<any> {
    return this.httpClient
      .post(this.BASE_URL + ApiPaths.PermissionEndpoint, Permission)
      .pipe(catchError(this.errorHandler));
  }
  //View list of Permission
  getPermissionApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.PermissionEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //Update Permission by id
  updatePermissionApi(id: number | string, Permission: any): Observable<any> {
    return this.httpClient
      .put(this.BASE_URL + ApiPaths.PermissionEndpoint + `/${id}`, Permission)
      .pipe(catchError(this.errorHandler));
  }
  //Delete Permission by id
  deletePermissionApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.PermissionEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  //post Add Specialization
  addSpecializationApi(Specialization: any): Observable<any> {
    return this.httpClient
      .post(this.BASE_URL + ApiPaths.SpecializationEndpoint, Specialization)
      .pipe(catchError(this.errorHandler));
  }
  //View list of Specialization
  getSpecializationApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.SpecializationEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //Update Specialization by id
  updateSpecializationApi(
    id: number | string,
    Specialization: any
  ): Observable<any> {
    return this.httpClient
      .put(
        this.BASE_URL + ApiPaths.SpecializationEndpoint + `/${id}`,
        Specialization
      )
      .pipe(catchError(this.errorHandler));
  }
  //Delete Specialization by id
  deleteSpecializationApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.SpecializationEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }
  //post Add Designation
  addDesignationApi(Designation: any): Observable<any> {
    return this.httpClient
      .post(this.BASE_URL + ApiPaths.DesignationEndpoint, Designation)
      .pipe(catchError(this.errorHandler));
  }
  //View list of Designation
  getDesignationApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.DesignationEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //Update Designation by id
  updateDesignationApi(id: number | string, Designation: any): Observable<any> {
    return this.httpClient
      .put(this.BASE_URL + ApiPaths.DesignationEndpoint + `/${id}`, Designation)
      .pipe(catchError(this.errorHandler));
  }
  //Delete Designation by id
  deleteDesignationApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.DesignationEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }
  //post Add TaxRule
  addTaxRuleApi(TaxRule: any): Observable<any> {
    return this.httpClient
      .post(this.BASE_URL + ApiPaths.TaxRuleEndpoint, TaxRule)
      .pipe(catchError(this.errorHandler));
  }
  //View list of TaxRule
  getTaxRuleApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.TaxRuleEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //Update TaxRule by id
  updateTaxRuleApi(id: number | string, TaxRule: any): Observable<any> {
    return this.httpClient
      .put(this.BASE_URL + ApiPaths.TaxRuleEndpoint + `/${id}`, TaxRule)
      .pipe(catchError(this.errorHandler));
  }
  //Delete TaxRule by id
  deleteTaxRuleApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.TaxRuleEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  getEducationLevelApi(): Observable<any[]> {
    return this.httpClient.get<any>(
      this.BASE_URL + ApiPaths.EducationLevelEndpoint
    );
  }
  getEducationLevelByIdApi(id: number): Observable<any[]> {
    return this.httpClient.get<any>(
      this.BASE_URL + ApiPaths.EducationLevelEndpoint + `/${id}`
    );
  }

  addEducationLevelApi(data: any) {
    return this.httpClient.post(
      this.BASE_URL + ApiPaths.EducationLevelEndpoint,
      data
    );
  }

  updateEducationLevelApi(id: number | string, data: any) {
    return this.httpClient.put(
      this.BASE_URL + ApiPaths.EducationLevelEndpoint + `/${id}`,
      data
    );
  }

  deleteEducationLevelApi(id: number | string) {
    return this.httpClient.delete(
      this.BASE_URL + ApiPaths.EducationLevelEndpoint + `/${id}`
    );
  }
  getMedicalDepartmentApi(): Observable<any[]> {
    return this.httpClient.get<any>(
      this.BASE_URL + ApiPaths.MedicalDepartmentEndpoint
    );
  }
  getMedicalDepartmentByIdApi(id: number): Observable<any[]> {
    return this.httpClient.get<any>(
      this.BASE_URL + ApiPaths.MedicalDepartmentEndpoint + `/${id}`
    );
  }

  addMedicalDepartmentApi(data: any) {
    return this.httpClient.post(
      this.BASE_URL + ApiPaths.MedicalDepartmentEndpoint,
      data
    );
  }

  updateMedicalDepartmentApi(id: number | string, data: any) {
    return this.httpClient.put(
      this.BASE_URL + ApiPaths.MedicalDepartmentEndpoint + `/${id}`,
      data
    );
  }

  deleteMedicalDepartmentApi(id: number | string) {
    return this.httpClient.delete(
      this.BASE_URL + ApiPaths.MedicalDepartmentEndpoint + `/${id}`
    );
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
