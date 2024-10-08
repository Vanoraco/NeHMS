import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiPaths } from '../enum/api-paths';

@Injectable({
  providedIn: 'root',
})
export class BillingService {
  BASE_URL = environment.baseUrl;
  // JSON_URL = environment.jsonUrl;
  constructor(private httpClient: HttpClient) {}

  //post Add PayrollReport
  addPayrollReportApi(PayrollReport: any): Observable<any> {
    return this.httpClient
      .post(this.BASE_URL + ApiPaths.PayrollReportEndpoint, PayrollReport)
      .pipe(catchError(this.errorHandler));
  }
  //View list of PayrollReport
  getPayrollReportApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.PayrollReportEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //View list of PayrollReport by id
  getPayrollReportByIdApi(id: number): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.PayrollReportEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }
  //update PayrollReport by id
  updatePayrollReportApi(
    id: number | string,
    PayrollReport: any
  ): Observable<any> {
    return this.httpClient
      .put(
        this.BASE_URL + ApiPaths.PayrollReportEndpoint + `/${id}`,
        PayrollReport
      )
      .pipe(catchError(this.errorHandler));
  }
  //Delete PayrollReport by id
  deletePayrollReportApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.PayrollReportEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }
  //post Add BillLab
  addBillLabApi(BillLab: any): Observable<any> {
    return this.httpClient
      .post(this.BASE_URL + ApiPaths.BillLabEndpoint, BillLab)
      .pipe(catchError(this.errorHandler));
  }
  //View list of BillLab
  getBillLabApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.BillLabEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //update BillLab by id
  updateBillLabApi(id: number | string, BillLab: any): Observable<any> {
    return this.httpClient
      .put(this.BASE_URL + ApiPaths.BillLabEndpoint + `/${id}`, BillLab)
      .pipe(catchError(this.errorHandler));
  }
  //Delete BillLab by id
  deleteBillLabApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.BillLabEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }
  //post Add ServiceCharge
  addServiceChargeApi(ServiceCharge: any): Observable<any> {
    return this.httpClient
      .post(this.BASE_URL + ApiPaths.ServiceChargeEndpoint, ServiceCharge)
      .pipe(catchError(this.errorHandler));
  }
  //View list of ServiceCharge
  getServiceChargeApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.ServiceChargeEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  getServiceChargeByIdApi(id: number): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.ServiceChargeEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }
  //update ServiceCharge by id
  updateServiceChargeApi(
    id: number | string,
    ServiceCharge: any
  ): Observable<any> {
    return this.httpClient
      .put(
        this.BASE_URL + ApiPaths.ServiceChargeEndpoint + `/${id}`,
        ServiceCharge
      )
      .pipe(catchError(this.errorHandler));
  }
  //Delete ServiceCharge by id
  deleteServiceChargeApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.ServiceChargeEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  //post Add   BillSchedule
  addBillScheduleApi(BillSchedule: any): Observable<any> {
    return this.httpClient
      .post(this.BASE_URL + ApiPaths.BillSchedulesEndpoint, BillSchedule)
      .pipe(catchError(this.errorHandler));
  }
  //View list of   BillSchedule
  getBillScheduleApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.BillSchedulesEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //View list of   BillSchedule
  getBillScheduleByIdApi(id: number): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.BillSchedulesEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }
  //View   BillSchedule by id
  updateBillScheduleApi(
    id: number | string,
    BillSchedule: any
  ): Observable<any> {
    return this.httpClient
      .put(
        this.BASE_URL + ApiPaths.BillSchedulesEndpoint + `/${id}`,
        BillSchedule
      )
      .pipe(catchError(this.errorHandler));
  }
  //Delete   BillSchedule by id
  deleteBillScheduleApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.BillSchedulesEndpoint + `/${id}`)
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
