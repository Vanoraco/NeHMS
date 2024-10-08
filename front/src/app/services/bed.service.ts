import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiPaths } from '../enum/api-paths';

@Injectable({
  providedIn: 'root',
})
export class BedService {
  BASE_URL = environment.baseUrl;
  constructor(private httpClient: HttpClient) {}

  //post Add Bed
  addBedApi(bed: any): Observable<any> {
    return this.httpClient
      .post(this.BASE_URL + ApiPaths.BedEndpoint, bed)
      .pipe(catchError(this.errorHandler));
  }
  //View list of Bed
  getBedApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.BedEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //View Bed by id
  updateBedApi(id: number | string, bed: any): Observable<any> {
    return this.httpClient
      .put(this.BASE_URL + ApiPaths.BedEndpoint + `/${id}`, bed)
      .pipe(catchError(this.errorHandler));
  }
  //Delete Bed by id
  deleteBedApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.BedEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  //post Add BedAllotment
  addBedAllotmentApi(bedAllotment: any): Observable<any> {
    return this.httpClient
      .post(this.BASE_URL + ApiPaths.BedAllotmentEndpoint, bedAllotment)
      .pipe(catchError(this.errorHandler));
  }
  //View list of BedAllotment
  getBedAllotmentApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.BedAllotmentEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //View BedAllotment by id
  updateBedAllotmentApi(
    id: number | string,
    bedAllotment: any
  ): Observable<any> {
    return this.httpClient
      .put(
        this.BASE_URL + ApiPaths.BedAllotmentEndpoint + `/${id}`,
        bedAllotment
      )
      .pipe(catchError(this.errorHandler));
  }
  //Delete BedAllotment by id
  deleteBedAllotmentApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.BedAllotmentEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  //post Add Building
  addBuildingApi(building: any): Observable<any> {
    return this.httpClient
      .post(this.BASE_URL + ApiPaths.BuildingEndpoint, building)
      .pipe(catchError(this.errorHandler));
  }
  //get View list of Building
  getBuildingApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.BuildingEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //put Update Building by id
  updateBuildingApi(id: number | string, building: any): Observable<any> {
    return this.httpClient
      .put(this.BASE_URL + ApiPaths.BuildingEndpoint + `/${id}`, building)
      .pipe(catchError(this.errorHandler));
  }
  //delete Remove Building by id
  deleteBuildingApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.BuildingEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  //post Add BedType
  addBedTypeApi(bedType: any): Observable<any> {
    return this.httpClient
      .post(this.BASE_URL + ApiPaths.BedTypeEndpoint, bedType)
      .pipe(catchError(this.errorHandler));
  }
  //get View list of BedType
  getBedTypeApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.BedTypeEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //put Update BedType by id
  updateBedTypeApi(id: number | string, bedType: any): Observable<any> {
    return this.httpClient
      .put(this.BASE_URL + ApiPaths.BedTypeEndpoint + `/${id}`, bedType)
      .pipe(catchError(this.errorHandler));
  }
  //delete Remove Employee by id
  deleteBedTypeApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.BedTypeEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  //post Add Available
  addAvailableApi(available: any): Observable<any> {
    return this.httpClient
      .post(this.BASE_URL + ApiPaths.AvailableEndpoint, available)
      .pipe(catchError(this.errorHandler));
  }
  //get View list of Availables
  getAvailableApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.AvailableEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //put Update Available by id
  updateAvailableApi(id: number | string, available: any): Observable<any> {
    return this.httpClient
      .put(this.BASE_URL + ApiPaths.AvailableEndpoint + `/${id}`, available)
      .pipe(catchError(this.errorHandler));
  }
  //delete Remove Available by id
  deleteAvailableApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.AvailableEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  //post Add Room
  addRoomApi(room: any): Observable<any> {
    return this.httpClient
      .post(this.BASE_URL + ApiPaths.RoomEndpoint, room)
      .pipe(catchError(this.errorHandler));
  }
  //get View list of Rooms
  getRoomApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.RoomEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //put Update Room by id
  updateRoomApi(id: number | string, room: any): Observable<any> {
    return this.httpClient
      .put(this.BASE_URL + ApiPaths.RoomEndpoint + `/${id}`, room)
      .pipe(catchError(this.errorHandler));
  }
  //delete Remove Room by id
  deleteRoomApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.RoomEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  //post Add Ward
  addWardApi(ward: any): Observable<any> {
    return this.httpClient
      .post(this.BASE_URL + ApiPaths.WardEndpoint, ward)
      .pipe(catchError(this.errorHandler));
  }
  //get View list of Wards
  getWardApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.WardEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //put Update Ward by id
  updateWardApi(id: number | string, ward: any): Observable<any> {
    return this.httpClient
      .put(this.BASE_URL + ApiPaths.WardEndpoint + `/${id}`, ward)
      .pipe(catchError(this.errorHandler));
  }
  //delete Remove Ward by id
  deleteWardApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.WardEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  //post Add WardType
  addWardTypeApi(wardType: any): Observable<any> {
    return this.httpClient
      .post(this.BASE_URL + ApiPaths.WardTypeEndpoint, wardType)
      .pipe(catchError(this.errorHandler));
  }
  //get View list of WardTypes
  getWardTypeApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.WardTypeEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //put Update WardType by id
  updateWardTypeApi(id: number | string, wardType: any): Observable<any> {
    return this.httpClient
      .put(this.BASE_URL + ApiPaths.WardTypeEndpoint + `/${id}`, wardType)
      .pipe(catchError(this.errorHandler));
  }
  //delete Remove WardType by id
  deleteWardTypeApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.WardTypeEndpoint + `/${id}`)
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
