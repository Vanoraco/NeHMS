import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiPaths } from '../enum/api-paths';

@Injectable({
  providedIn: 'root',
})
export class PharmacyService {
  BASE_URL = environment.baseUrl;
  constructor(private httpClient: HttpClient) {}

  //post Add MedicineCategory
  addMedicineCategoryApi(MedicineCategory: any): Observable<any> {
    return this.httpClient
      .post(this.BASE_URL + ApiPaths.MedicineCategoryEndpoint, MedicineCategory)
      .pipe(catchError(this.errorHandler));
  }
  //View list of MedicineCategory
  getMedicineCategoryApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.MedicineCategoryEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //View MedicineCategory by id
  updateMedicineCategoryApi(
    id: number | string,
    MedicineCategory: any
  ): Observable<any> {
    return this.httpClient
      .put(
        this.BASE_URL + ApiPaths.MedicineCategoryEndpoint + `/${id}`,
        MedicineCategory
      )
      .pipe(catchError(this.errorHandler));
  }
  //Delete MedicineCategory by id
  deleteMedicineCategoryApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.MedicineCategoryEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  //post Add Medication
  addMedicationApi(Medication: any): Observable<any> {
    return this.httpClient
      .post(this.BASE_URL + ApiPaths.MedicationEndpoint, Medication)
      .pipe(catchError(this.errorHandler));
  }
  //View list of Medication
  getMedicationApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.MedicationEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //View Medication by id
  updateMedicationApi(id: number | string, Medication: any): Observable<any> {
    return this.httpClient
      .put(this.BASE_URL + ApiPaths.MedicationEndpoint + `/${id}`, Medication)
      .pipe(catchError(this.errorHandler));
  }
  //Delete Medication by id
  deleteMedicationApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.MedicationEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }
  //post Add MedSupplier
  addMedSupplierApi(MedSupplier: any): Observable<any> {
    return this.httpClient
      .post(this.BASE_URL + ApiPaths.MedSupplierEndpoint, MedSupplier)
      .pipe(catchError(this.errorHandler));
  }
  //View list of MedSupplier
  getMedSupplierApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.MedSupplierEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //View MedSupplier by id
  updateMedSupplierApi(id: number | string, MedSupplier: any): Observable<any> {
    return this.httpClient
      .put(this.BASE_URL + ApiPaths.MedSupplierEndpoint + `/${id}`, MedSupplier)
      .pipe(catchError(this.errorHandler));
  }
  //Delete MedSupplier by id
  deleteMedSupplierApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.MedSupplierEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }
  //post Add PharmacyMedStock
  addPharmacyMedStockApi(PharmacyMedStock: any): Observable<any> {
    return this.httpClient
      .post(this.BASE_URL + ApiPaths.PharmacyMedStockEndpoint, PharmacyMedStock)
      .pipe(catchError(this.errorHandler));
  }
  //View list of PharmacyMedStock
  getPharmacyMedStockApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.PharmacyMedStockEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //View list of PharmacyMedStock by id
  getPharmacyMedStockIdApi(id: any) {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.PharmacyMedStockEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }
  //update PharmacyMedStock by id
  updatePharmacyMedStockApi(
    id: number | string,
    PharmacyMedStock: any
  ): Observable<any> {
    return this.httpClient
      .put(
        this.BASE_URL + ApiPaths.PharmacyMedStockEndpoint + `/${id}`,
        PharmacyMedStock
      )
      .pipe(catchError(this.errorHandler));
  }
  //Delete PharmacyMedStock by id
  deletePharmacyMedStockApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.PharmacyMedStockEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  //post Add MedicineStockHospital
  addMedicineStockHospitalApi(MedicineStockHospital: any): Observable<any> {
    return this.httpClient
      .post(
        this.BASE_URL + ApiPaths.MedicineStockHospitalEndpoint,
        MedicineStockHospital
      )
      .pipe(catchError(this.errorHandler));
  }
  //View list of MedicineStockHospital
  getMedicineStockHospitalApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.MedicineStockHospitalEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //View MedicineStockHospital by id
  updateMedicineStockHospitalApi(
    id: number | string,
    MedicineStockHospital: any
  ): Observable<any> {
    return this.httpClient
      .put(
        this.BASE_URL + ApiPaths.MedicineStockHospitalEndpoint + `/${id}`,
        MedicineStockHospital
      )
      .pipe(catchError(this.errorHandler));
  }
  //Delete MedicineStockHospital by id
  deleteMedicineStockHospitalApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.MedicineStockHospitalEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  //post Add PharmacySale
  addPharmacySaleApi(PharmacySale: any): Observable<any> {
    return this.httpClient
      .post(this.BASE_URL + ApiPaths.PharmacySaleEndpoint, PharmacySale)
      .pipe(catchError(this.errorHandler));
  }
  //View list of PharmacySale
  getPharmacySaleApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.PharmacySaleEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //View list of PharmacySale
  getPharmacySaleByIdApi(id: number | string): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.PharmacySaleEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }
  //View PharmacySale by id
  updatePharmacySaleApi(
    id: number | string,
    PharmacySale: any
  ): Observable<any> {
    return this.httpClient
      .put(
        this.BASE_URL + ApiPaths.PharmacySaleEndpoint + `/${id}`,
        PharmacySale
      )
      .pipe(catchError(this.errorHandler));
  }
  //Delete PharmacySale by id
  deletePharmacySaleApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.PharmacySaleEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  //post Add Prescription
  addPrescriptionApi(Prescription: any): Observable<any> {
    return this.httpClient
      .post(this.BASE_URL + ApiPaths.PrescriptionEndpoint, Prescription)
      .pipe(catchError(this.errorHandler));
  }
  //View list of Prescription
  getPrescriptionApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.PrescriptionEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //View Prescription by id
  getPrescriptionByIdApi(id: number): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.PrescriptionEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }
  //Update Prescription by id
  updatePrescriptionApi(
    id: number | string,
    Prescription: any
  ): Observable<any> {
    return this.httpClient
      .put(
        this.BASE_URL + ApiPaths.PrescriptionEndpoint + `/${id}`,
        Prescription
      )
      .pipe(catchError(this.errorHandler));
  }
  //Delete Prescription by id
  deletePrescriptionApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.PrescriptionEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  //post Add Vaccine
  addVaccineApi(Vaccine: any): Observable<any> {
    return this.httpClient
      .post(this.BASE_URL + ApiPaths.VaccineEndpoint, Vaccine)
      .pipe(catchError(this.errorHandler));
  }
  //View list of Vaccine
  getVaccineApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.VaccineEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //View Vaccine by id
  updateVaccineApi(id: number | string, Vaccine: any): Observable<any> {
    return this.httpClient
      .put(this.BASE_URL + ApiPaths.VaccineEndpoint + `/${id}`, Vaccine)
      .pipe(catchError(this.errorHandler));
  }
  //Delete Vaccine by id
  deleteVaccineApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.VaccineEndpoint + `/${id}`)
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
