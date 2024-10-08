import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiPaths } from '../enum/api-paths';

@Injectable({
  providedIn: 'root',
})
export class RevenueService {
  BASE_URL = environment.baseUrl;
  constructor(private httpClient: HttpClient) {}

  //post Add RevenueCategory
  addRevenueCategoryApi(RevenueCategory: any): Observable<any> {
    return this.httpClient
      .post(this.BASE_URL + ApiPaths.RevenueCategoryEndpoint, RevenueCategory)
      .pipe(catchError(this.errorHandler));
  }
  //View list of RevenueCategory
  getRevenueCategoryApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.RevenueCategoryEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //View RevenueCategory by id
  updateRevenueCategoryApi(
    id: number | string,
    RevenueCategory: any
  ): Observable<any> {
    return this.httpClient
      .put(
        this.BASE_URL + ApiPaths.RevenueCategoryEndpoint + `/${id}`,
        RevenueCategory
      )
      .pipe(catchError(this.errorHandler));
  }
  //Delete RevenueCategory by id
  deleteRevenueCategoryApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.RevenueCategoryEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  //post Add Revenue
  addRevenueApi(Revenue: any): Observable<any> {
    return this.httpClient
      .post(this.BASE_URL + ApiPaths.RevenueEndpoint, Revenue)
      .pipe(catchError(this.errorHandler));
  }
  //View list of Revenue
  getRevenueApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.RevenueEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //View Revenue by id
  updateRevenueApi(id: number | string, Revenue: any): Observable<any> {
    return this.httpClient
      .put(this.BASE_URL + ApiPaths.RevenueEndpoint + `/${id}`, Revenue)
      .pipe(catchError(this.errorHandler));
  }
  //Delete Revenue by id
  deleteRevenueApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.RevenueEndpoint + `/${id}`)
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
