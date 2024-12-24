import { Injectable, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { ApiPaths } from '../enum/api-paths';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly BASE_URL = environment.baseUrl;
  // readonly JSON_URL = environment.jsonUrl;

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient: HttpClient, private router: Router) {}
  employeeLoginApi(user: any) {
    return this.httpClient.post(
      this.BASE_URL + ApiPaths.LoginApiEndpoint,
      user
    );
  }

  employeeRegisterApi(empData: any) {
    return this.httpClient.post(
      this.BASE_URL + ApiPaths.RegisterApiEndpoint,
      empData
    );
  }

  patientLoginApi(patientId: any) {
    return this.httpClient.post(
      this.BASE_URL + ApiPaths.PatientLoginApiEndpoint,
      patientId
    );
  }

  getAdmissionByIdApi(id: number): Observable<any> {
    return this.httpClient
      .get( 'admission-details' + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  storeToken(token: any) {
    return localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  employeeLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('Role');
    window.location.reload();
    this.router.navigate(['login']);
  }

  decodeToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken();
    return jwtHelper.decodeToken(token);
  }
  getEmailFromToken() {
    this.decodeToken();
    return this.decodeToken().email;
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

