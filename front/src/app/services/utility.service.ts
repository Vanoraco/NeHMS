import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiPaths } from '../enum/api-paths';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  BASE_URL = environment.baseUrl;
  // JSON_URL = environment.jsonUrl;
  constructor(private httpClient: HttpClient) {}

  //post Add BloodGroupStatus
  addBloodGroupStatusApi(BloodGroupStatus: any): Observable<any> {
    return this.httpClient
      .post(this.BASE_URL + ApiPaths.BloodGroupStatusEndpoint, BloodGroupStatus)
      .pipe(catchError(this.errorHandler));
  }
  //View list of BloodGroupStatus
  getBloodGroupStatusApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.BloodGroupStatusEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //View list of BloodGroupStatus
  getBloodGroupStatusIdApi(id: number): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.BloodGroupStatusEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }
  //View BloodGroupStatus by id
  updateBloodGroupStatusApi(id: number | string, BloodGroupStatus: any): Observable<any> {
    return this.httpClient
      .put(this.BASE_URL + ApiPaths.BloodGroupStatusEndpoint + `/${id}`, BloodGroupStatus)
      .pipe(catchError(this.errorHandler));
  }
  //Delete BloodGroupStatus by id
  deleteBloodGroupStatusApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.BloodGroupStatusEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  //post Add BloodGroup
  addBloodGroupApi(BloodGroup: any): Observable<any> {
    return this.httpClient
      .post(this.BASE_URL + ApiPaths.BloodGroupEndpoint, BloodGroup)
      .pipe(catchError(this.errorHandler));
  }
  //View list of BloodGroup
  getBloodGroupApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.BloodGroupEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //View list of BloodGroup
  getBloodGroupIdApi(id: number): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.BloodGroupEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }
  //View BloodGroup by id
  updateBloodGroupApi(id: number | string, BloodGroup: any): Observable<any> {
    return this.httpClient
      .put(this.BASE_URL + ApiPaths.BloodGroupEndpoint + `/${id}`, BloodGroup)
      .pipe(catchError(this.errorHandler));
  }
  //Delete BloodGroup by id
  deleteBloodGroupApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.BloodGroupEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  //post Add Donor
  addDonorApi(Donor: any): Observable<any> {
    return this.httpClient
      .post(this.BASE_URL + ApiPaths.DonorEndpoint, Donor)
      .pipe(catchError(this.errorHandler));
  }
  //View list of Donor
  getDonorApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.DonorEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //View list of Donor
  getDonorIdApi(id: number): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.DonorEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }
  //View Donor by id
  updateDonorApi(id: number | string, Donor: any): Observable<any> {
    return this.httpClient
      .put(this.BASE_URL + ApiPaths.DonorEndpoint + `/${id}`, Donor)
      .pipe(catchError(this.errorHandler));
  }
  //Delete Donor by id
  deleteDonorApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.DonorEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  //post Add Holiday
  addHolidayApi(Holiday: any): Observable<any> {
    return this.httpClient
      .post(this.BASE_URL + ApiPaths.HolidayEndpoint, Holiday)
      .pipe(catchError(this.errorHandler));
  }
  //View list of Holiday
  getHolidayApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.HolidayEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //Update Holiday by id
  updateHolidayApi(id: number | string, Holiday: any): Observable<any> {
    return this.httpClient
      .put(this.BASE_URL + ApiPaths.HolidayEndpoint + `/${id}`, Holiday)
      .pipe(catchError(this.errorHandler));
  }
  //Delete Holiday by id
  deleteHolidayApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.HolidayEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  //post Add Overtime
  addOvertimeApi(Overtime: any): Observable<any> {
    return this.httpClient
      .post(this.BASE_URL + ApiPaths.OvertimeEndpoint, Overtime)
      .pipe(catchError(this.errorHandler));
  }
  //View list of Overtime
  getOvertimeApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.OvertimeEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //Update Overtime by id
  updateOvertimeApi(id: number | string, Overtime: any): Observable<any> {
    return this.httpClient
      .put(this.BASE_URL + ApiPaths.OvertimeEndpoint + `/${id}`, Overtime)
      .pipe(catchError(this.errorHandler));
  }
  //Delete Overtime by id
  deleteOvertimeApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.OvertimeEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }
  //post Add Notice
  addNoticeApi(Notice: any): Observable<any> {
    return this.httpClient
      .post(this.BASE_URL + ApiPaths.NoticeEndpoint, Notice)
      .pipe(catchError(this.errorHandler));
  }
  //View list of Notice
  getNoticeApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.NoticeEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //View list of Notice
  getNoticeByIdApi(id: number | string): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.NoticeEndpoint+ `/${id}`)
      .pipe(catchError(this.errorHandler));
  }
  //Update Notice by id
  updateNoticeApi(id: number | string, Notice: any): Observable<any> {
    return this.httpClient
      .put(this.BASE_URL + ApiPaths.NoticeEndpoint + `/${id}`, Notice)
      .pipe(catchError(this.errorHandler));
  }
  //Delete Notice by id
  deleteNoticeApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.NoticeEndpoint + `/${id}`)
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
