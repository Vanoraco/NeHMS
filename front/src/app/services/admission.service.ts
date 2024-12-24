import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiPaths } from '../enum/api-paths';

@Injectable({
  providedIn: 'root',
})
export class AdmissionService {
  BASE_URL = environment.baseUrl;
  constructor(private httpClient: HttpClient) {}

  //post Add Admission
  addAdmissionApi(Admission: any): Observable<any> {
    return this.httpClient
      .post(this.BASE_URL + ApiPaths.AdmissionEndpoint, Admission)
      .pipe(catchError(this.errorHandler));
  }
  //get View list of Admissions
  getAdmissionApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.AdmissionEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //get View list of Admissions
  getAdmissionByIdApi(id: number): Observable<any> {
    return this.httpClient
      .get( this.BASE_URL + ApiPaths.AdmissionEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }
  //put Update Admission by id
  updateAdmissionApi(id: number | string, Admission: any): Observable<any> {
    return this.httpClient
      .put(this.BASE_URL + ApiPaths.AdmissionEndpoint + `/${id}`, Admission)
      .pipe(catchError(this.errorHandler));
  }
  //delete Remove Admission by id
  deleteAdmissionApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.AdmissionEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }
  //post Add AdmissionType
  addAdmissionTypeApi(AdmissionType: any): Observable<any> {
    return this.httpClient
      .post(this.BASE_URL + ApiPaths.AdmissionTypeEndpoint, AdmissionType)
      .pipe(catchError(this.errorHandler));
  }
  //get View list of AdmissionTypes
  getAdmissionTypeApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.AdmissionTypeEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //put Update AdmissionType by id
  updateAdmissionTypeApi(
    id: number | string,
    AdmissionType: any
  ): Observable<any> {
    return this.httpClient
      .put(
        this.BASE_URL + ApiPaths.AdmissionTypeEndpoint + `/${id}`,
        AdmissionType
      )
      .pipe(catchError(this.errorHandler));
  }
  //delete Remove AdmissionType by id
  deleteAdmissionTypeApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.AdmissionTypeEndpoint + `/${id}`)
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
