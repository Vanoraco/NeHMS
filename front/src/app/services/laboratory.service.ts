import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiPaths } from '../enum/api-paths';

@Injectable({
  providedIn: 'root',
})
export class LaboratoryService {
  BASE_URL = environment.baseUrl;
  // JSON_URL = environment.jsonUrl;
  constructor(private httpClient: HttpClient) {}

  //post Add LabRequest
  addLabRequestApi(LabRequest: any): Observable<any> {
    return this.httpClient
      .post(this.BASE_URL + ApiPaths.LabRequestEndpoint, LabRequest)
      .pipe(catchError(this.errorHandler));
  }
  //View list of LabRequest
  getLabRequestApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.LabRequestEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //View list of LabRequest
  getLabRequestByIdApi(id: number): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.LabRequestEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }
  //View LabRequest by id
  updateLabRequestApi(id: number | string, LabRequest: any): Observable<any> {
    return this.httpClient
      .put(this.BASE_URL + ApiPaths.LabRequestEndpoint + `/${id}`, LabRequest)
      .pipe(catchError(this.errorHandler));
  }
  //Delete LabRequest by id
  deleteLabRequestApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.LabRequestEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }
  //post Add LabTestCategory
  addLabTestCategoryApi(LabTestCategory: any): Observable<any> {
    return this.httpClient
      .post(this.BASE_URL + ApiPaths.LabTestCategoryEndpoint, LabTestCategory)
      .pipe(catchError(this.errorHandler));
  }
  //View list of LabTestCategory
  getLabTestCategoryApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.LabTestCategoryEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //View LabTestCategory by id
  updateLabTestCategoryApi(
    id: number | string,
    LabTestCategory: any
  ): Observable<any> {
    return this.httpClient
      .put(
        this.BASE_URL + ApiPaths.LabTestCategoryEndpoint + `/${id}`,
        LabTestCategory
      )
      .pipe(catchError(this.errorHandler));
  }
  //Delete LabTestCategory by id
  deleteLabTestCategoryApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.LabTestCategoryEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  //post Add LabTestResult
  addLabTestResultApi(LabTestResult: any): Observable<any> {
    return this.httpClient
      .post(this.BASE_URL + ApiPaths.LabTestResultEndpoint, LabTestResult)
      .pipe(catchError(this.errorHandler));
  }
  //View list of LabTestResult
  getLabTestResultApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.LabTestResultEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //View list of LabTestResult
  getLabTestResultByIdApi(id: number | string): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.LabTestResultEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }
  //View LabTestResult by id
  updateLabTestResultApi(
    id: number | string,
    LabTestResult: any
  ): Observable<any> {
    return this.httpClient
      .put(
        this.BASE_URL + ApiPaths.LabTestResultEndpoint + `/${id}`,
        LabTestResult
      )
      .pipe(catchError(this.errorHandler));
  }
  //Delete LabTestResult by id
  deleteLabTestResultApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.LabTestResultEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  //post Add LabTestType
  addLabTestTypeApi(LabTestType: any): Observable<any> {
    return this.httpClient
      .post(this.BASE_URL + ApiPaths.LabTestTypeEndpoint, LabTestType)
      .pipe(catchError(this.errorHandler));
  }
  //View list of LabTestType
  getLabTestTypeApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.LabTestTypeEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //View LabTestType by id
  updateLabTestTypeApi(id: number | string, LabTestType: any): Observable<any> {
    return this.httpClient
      .put(this.BASE_URL + ApiPaths.LabTestTypeEndpoint + `/${id}`, LabTestType)
      .pipe(catchError(this.errorHandler));
  }
  //Delete LabTestType by id
  deleteLabTestTypeApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.LabTestTypeEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  //post Add MedicalHistoryDrug
  addMedicalHistoryDrugApi(MedicalHistoryDrug: any): Observable<any> {
    return this.httpClient
      .post(
        this.BASE_URL + ApiPaths.MedicalHistoryDrugEndpoint,
        MedicalHistoryDrug
      )
      .pipe(catchError(this.errorHandler));
  }
  //View list of MedicalHistoryDrug
  getMedicalHistoryDrugApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.MedicalHistoryDrugEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //View MedicalHistoryDrug by id
  updateMedicalHistoryDrugApi(
    id: number | string,
    MedicalHistoryDrug: any
  ): Observable<any> {
    return this.httpClient
      .put(
        this.BASE_URL + ApiPaths.MedicalHistoryDrugEndpoint + `/${id}`,
        MedicalHistoryDrug
      )
      .pipe(catchError(this.errorHandler));
  }
  //Delete MedicalHistoryDrug by id
  deleteMedicalHistoryDrugApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.MedicalHistoryDrugEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  //post Add MedicalHistory
  addMedicalHistoryApi(MedicalHistory: any): Observable<any> {
    return this.httpClient
      .post(this.BASE_URL + ApiPaths.MedicalHistoryEndpoint, MedicalHistory)
      .pipe(catchError(this.errorHandler));
  }
  //View list of MedicalHistory
  getMedicalHistoryApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.MedicalHistoryEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //View MedicalHistory by id
  updateMedicalHistoryApi(
    id: number | string,
    MedicalHistory: any
  ): Observable<any> {
    return this.httpClient
      .put(
        this.BASE_URL + ApiPaths.MedicalHistoryEndpoint + `/${id}`,
        MedicalHistory
      )
      .pipe(catchError(this.errorHandler));
  }
  //Delete MedicalHistory by id
  deleteMedicalHistoryApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.MedicalHistoryEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  //post Add MedicalInterviewSocrates
  addMedicalInterviewSocratesApi(
    MedicalInterviewSocrates: any
  ): Observable<any> {
    return this.httpClient
      .post(
        this.BASE_URL + ApiPaths.MedicalInterviewSocratesEndpoint,
        MedicalInterviewSocrates
      )
      .pipe(catchError(this.errorHandler));
  }
  //View list of MedicalInterviewSocrates
  getMedicalInterviewSocratesApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.MedicalInterviewSocratesEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //View MedicalInterviewSocrates by id
  updateMedicalInterviewSocratesApi(
    id: number | string,
    MedicalInterviewSocrates: any
  ): Observable<any> {
    return this.httpClient
      .put(
        this.BASE_URL + ApiPaths.MedicalInterviewSocratesEndpoint + `/${id}`,
        MedicalInterviewSocrates
      )
      .pipe(catchError(this.errorHandler));
  }
  //Delete MedicalInterviewSocrates by id
  deleteMedicalInterviewSocratesApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(
        this.BASE_URL + ApiPaths.MedicalInterviewSocratesEndpoint + `/${id}`
      )
      .pipe(catchError(this.errorHandler));
  }

  //View list of ScheduleStatus
  getScheduleStatusApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.ScheduleStatusEndpoint)
      .pipe(catchError(this.errorHandler));
  }

  //View list of AppointmentDuration
  getAppointmentDurationApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.AppointmentDurationEndpoint)
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
