import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiPaths } from '../enum/api-paths';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  BASE_URL = environment.baseUrl;
  // JSON_URL = environment.jsonUrl;
  constructor(private httpClient: HttpClient) {}

  //post Add PatientImage
  addPatientImageApi(imageFile: Blob, fileName: string){
    const formData = new FormData();
    formData.append('file', imageFile, fileName);
    return this.httpClient
      .post(this.BASE_URL + ApiPaths.ImageUploadEndpoint, formData)
      .pipe(catchError(this.errorHandler));
  }

  //View list of PatientImage
  getPatientImageApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.ImageUploadEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //View list of PatientImage
  getPatientImageByIdApi(id: number): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.ImageUploadEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }
  //Update PatientImage by id
  updatePatientImageApi(
    id: number | string,
    PatientImage: any
  ): Observable<any> {
    return this.httpClient
      .put(
        this.BASE_URL + ApiPaths.ImageUploadEndpoint + `/${id}`,
        PatientImage
      )
      .pipe(catchError(this.errorHandler));
  }
  //Delete PatientImage by id
  deletePatientImageApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.ImageUploadEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  //post Add Patient
  addPatientApi(Patient: any): Observable<any> {
    return this.httpClient
      .post(this.BASE_URL + ApiPaths.PatientEndpoint, Patient)
      .pipe(catchError(this.errorHandler));
  }
  //View list of Patient
  getPatientApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.PatientEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //View list of Patient
  getPatientByIdApi(id: number | string): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.PatientEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }
  //View Patient by id
  updatePatientApi(id: number | string, Patient: any): Observable<any> {
    return this.httpClient
      .put(this.BASE_URL + ApiPaths.PatientEndpoint + `/${id}`, Patient)
      .pipe(catchError(this.errorHandler));
  }
  //Delete Patient by id
  deletePatientApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.PatientEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }
  //post Add PatientSchedule
  addPatientScheduleApi(PatientSchedule: any): Observable<any> {
    return this.httpClient
      .post(this.BASE_URL + ApiPaths.PatientScheduleEndpoint, PatientSchedule)
      .pipe(catchError(this.errorHandler));
  }
  //View list of PatientSchedule
  getPatientScheduleApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.PatientScheduleEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //View PatientSchedule by id
  getPatientScheduleByIdApi(id: number | string): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.PatientScheduleEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }
  //View PatientSchedule by id
  updatePatientScheduleApi(
    id: number | string,
    PatientSchedule: any
  ): Observable<any> {
    return this.httpClient
      .put(
        this.BASE_URL + ApiPaths.PatientScheduleEndpoint + `/${id}`,
        PatientSchedule
      )
      .pipe(catchError(this.errorHandler));
  }
  //Delete PatientSchedule by id
  deletePatientScheduleApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.PatientScheduleEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }
  //post Add Case
  addCaseApi(Case: any): Observable<any> {
    return this.httpClient
      .post(this.BASE_URL + ApiPaths.CaseEndpoint, Case)
      .pipe(catchError(this.errorHandler));
  }
  //View list of Case
  getCaseApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.CaseEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //View Case by id
  updateCaseApi(id: number | string, Case: any): Observable<any> {
    return this.httpClient
      .put(this.BASE_URL + ApiPaths.CaseEndpoint + `/${id}`, Case)
      .pipe(catchError(this.errorHandler));
  }
  //Delete Case by id
  deleteCaseApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.CaseEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  //post Add Operation
  addOperationApi(Operation: any): Observable<any> {
    return this.httpClient
      .post(this.BASE_URL + ApiPaths.OperationEndpoint, Operation)
      .pipe(catchError(this.errorHandler));
  }
  //View list of Operation
  getOperationApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.OperationEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //View Operation by id
  updateOperationApi(id: number | string, Operation: any): Observable<any> {
    return this.httpClient
      .put(this.BASE_URL + ApiPaths.OperationEndpoint + `/${id}`, Operation)
      .pipe(catchError(this.errorHandler));
  }
  //Delete Operation by id
  deleteOperationApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.OperationEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  //View list of Relationship
  getRelationshipApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.RelationshipEndpoint)
      .pipe(catchError(this.errorHandler));
  }

  //post Add ResponsiblePerson
  addResponsiblePersonApi(ResponsiblePerson: any): Observable<any> {
    return this.httpClient
      .post(
        this.BASE_URL + ApiPaths.ResponsiblePersonEndpoint,
        ResponsiblePerson
      )
      .pipe(catchError(this.errorHandler));
  }
  //View list of ResponsiblePerson
  getResponsiblePersonApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.ResponsiblePersonEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //Update ResponsiblePerson by id
  updateResponsiblePersonApi(
    id: number | string,
    ResponsiblePerson: any
  ): Observable<any> {
    return this.httpClient
      .put(
        this.BASE_URL + ApiPaths.ResponsiblePersonEndpoint + `/${id}`,
        ResponsiblePerson
      )
      .pipe(catchError(this.errorHandler));
  }
  //Delete ResponsiblePerson by id
  deleteResponsiblePersonApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.ResponsiblePersonEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  //post Add Schedule
  addScheduleApi(Schedule: any): Observable<any> {
    return this.httpClient
      .post(this.BASE_URL + ApiPaths.ScheduleEndpoint, Schedule)
      .pipe(catchError(this.errorHandler));
  }
  //View list of Schedule
  getScheduleApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.ScheduleEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //View Schedule by id
  updateScheduleApi(id: number | string, Schedule: any): Observable<any> {
    return this.httpClient
      .put(this.BASE_URL + ApiPaths.ScheduleEndpoint + `/${id}`, Schedule)
      .pipe(catchError(this.errorHandler));
  }
  //Delete Schedule by id
  deleteScheduleApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.ScheduleEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  //Get list of WeekDay
  getWeekDayApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.WeekDayEndpoint)
      .pipe(catchError(this.errorHandler));
  }

  //post Add  PreExamCheckup
  addPreExamCheckupApi(PreExamCheckup: any): Observable<any> {
    return this.httpClient
      .post(this.BASE_URL + ApiPaths.PreExamCheckupEndpoint, PreExamCheckup)
      .pipe(catchError(this.errorHandler));
  }
  //View list of  PreExamCheckup
  getPreExamCheckupApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.PreExamCheckupEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //View  PreExamCheckup by id
  updatePreExamCheckupApi(
    id: number | string,
    PreExamCheckup: any
  ): Observable<any> {
    return this.httpClient
      .put(
        this.BASE_URL + ApiPaths.PreExamCheckupEndpoint + `/${id}`,
        PreExamCheckup
      )
      .pipe(catchError(this.errorHandler));
  }
  //Delete  PreExamCheckup by id
  deletePreExamCheckupApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.PreExamCheckupEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }
  //post Add  Birth
  addBirthApi(Birth: any): Observable<any> {
    return this.httpClient
      .post(this.BASE_URL + ApiPaths.BirthEndpoint, Birth)
      .pipe(catchError(this.errorHandler));
  }
  //View list of  Birth
  getBirthApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.BirthEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //View  Birth by id
  updateBirthApi(id: number | string, Birth: any): Observable<any> {
    return this.httpClient
      .put(this.BASE_URL + ApiPaths.BirthEndpoint + `/${id}`, Birth)
      .pipe(catchError(this.errorHandler));
  }
  //Delete  Birth by id
  deleteBirthApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.BirthEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }
  //post Add  Death
  addDeathApi(Death: any): Observable<any> {
    return this.httpClient
      .post(this.BASE_URL + ApiPaths.DeathEndpoint, Death)
      .pipe(catchError(this.errorHandler));
  }
  //View list of  Death
  getDeathApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.DeathEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //View  Death by id
  updateDeathApi(id: number | string, Death: any): Observable<any> {
    return this.httpClient
      .put(this.BASE_URL + ApiPaths.DeathEndpoint + `/${id}`, Death)
      .pipe(catchError(this.errorHandler));
  }
  //Delete  Death by id
  deleteDeathApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.DeathEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  //post Add  Recommendation
  addRecommendationApi(Recommendation: any): Observable<any> {
    return this.httpClient
      .post(this.BASE_URL + ApiPaths.RecommendationEndpoint, Recommendation)
      .pipe(catchError(this.errorHandler));
  }
  //View list of  Recommendation
  getRecommendationApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.RecommendationEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //View  Recommendation by id
  updateRecommendationApi(
    id: number | string,
    Recommendation: any
  ): Observable<any> {
    return this.httpClient
      .put(
        this.BASE_URL + ApiPaths.RecommendationEndpoint + `/${id}`,
        Recommendation
      )
      .pipe(catchError(this.errorHandler));
  }
  //Delete  Recommendation by id
  deleteRecommendationApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.RecommendationEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }
  //post Add  MedicalHistoryFamily
  addMedicalHistoryFamilyApi(MedicalHistoryFamily: any): Observable<any> {
    return this.httpClient
      .post(
        this.BASE_URL + ApiPaths.MedicalHistoryFamilyEndpoint,
        MedicalHistoryFamily
      )
      .pipe(catchError(this.errorHandler));
  }
  //View list of  MedicalHistoryFamily
  getMedicalHistoryFamilyApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.MedicalHistoryFamilyEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //View  MedicalHistoryFamily by id
  updateMedicalHistoryFamilyApi(
    id: number | string,
    MedicalHistoryFamily: any
  ): Observable<any> {
    return this.httpClient
      .put(
        this.BASE_URL + ApiPaths.MedicalHistoryFamilyEndpoint + `/${id}`,
        MedicalHistoryFamily
      )
      .pipe(catchError(this.errorHandler));
  }
  //Delete  MedicalHistoryFamily by id
  deleteMedicalHistoryFamilyApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.MedicalHistoryFamilyEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }
  //post Add  MedicalInterviewAllergy
  addMedicalInterviewAllergyApi(MedicalInterviewAllergy: any): Observable<any> {
    return this.httpClient
      .post(
        this.BASE_URL + ApiPaths.MedicalInterviewAllergyEndpoint,
        MedicalInterviewAllergy
      )
      .pipe(catchError(this.errorHandler));
  }
  //View list of  MedicalInterviewAllergy
  getMedicalInterviewAllergyApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.MedicalInterviewAllergyEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //View  MedicalInterviewAllergy by id
  updateMedicalInterviewAllergyApi(
    id: number | string,
    MedicalInterviewAllergy: any
  ): Observable<any> {
    return this.httpClient
      .put(
        this.BASE_URL + ApiPaths.MedicalInterviewAllergyEndpoint + `/${id}`,
        MedicalInterviewAllergy
      )
      .pipe(catchError(this.errorHandler));
  }
  //Delete  MedicalInterviewAllergy by id
  deleteMedicalInterviewAllergyApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(
        this.BASE_URL + ApiPaths.MedicalInterviewAllergyEndpoint + `/${id}`
      )
      .pipe(catchError(this.errorHandler));
  }

  //post Add  MedicalCertificate
  addMedicalCertificateApi(MedicalCertificate: any): Observable<any> {
    return this.httpClient
      .post(
        this.BASE_URL + ApiPaths.MedicalCertificateEndpoint,
        MedicalCertificate
      )
      .pipe(catchError(this.errorHandler));
  }
  //View list of  MedicalCertificate
  getMedicalCertificateApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.MedicalCertificateEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //View list of  MedicalCertificate
  getMedicalCertificateByIdApi(id: number): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.MedicalCertificateEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }
  //View  MedicalCertificate by id
  updateMedicalCertificateApi(
    id: number | string,
    MedicalCertificate: any
  ): Observable<any> {
    return this.httpClient
      .put(
        this.BASE_URL + ApiPaths.MedicalCertificateEndpoint + `/${id}`,
        MedicalCertificate
      )
      .pipe(catchError(this.errorHandler));
  }
  //Delete  MedicalCertificate by id
  deleteMedicalCertificateApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.MedicalCertificateEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  //post Add  Allergy
  addAllergyApi(Allergy: any): Observable<any> {
    return this.httpClient
      .post(this.BASE_URL + ApiPaths.AllergyEndpoint, Allergy)
      .pipe(catchError(this.errorHandler));
  }
  //View list of  Allergy
  getAllergyApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.AllergyEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //View  Allergy by id
  updateAllergyApi(id: number | string, Allergy: any): Observable<any> {
    return this.httpClient
      .put(this.BASE_URL + ApiPaths.AllergyEndpoint + `/${id}`, Allergy)
      .pipe(catchError(this.errorHandler));
  }
  //Delete  Allergy by id
  deleteAllergyApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.AllergyEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest(
      'POST',
      this.BASE_URL + ApiPaths.ImageUploadEndpoint,
      formData,
      {
        reportProgress: true,
        responseType: 'json',
      }
    );

    return this.httpClient.request(req);
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
