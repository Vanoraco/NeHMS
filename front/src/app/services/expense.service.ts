import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiPaths } from '../enum/api-paths';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  BASE_URL = environment.baseUrl;
  constructor(private httpClient: HttpClient) {}

  //post Add PharmacyExpenseCategory
  addPharmacyExpenseCategoryApi(PharmacyExpenseCategory: any): Observable<any> {
    return this.httpClient
      .post(
        this.BASE_URL + ApiPaths.PharmacyExpenseCategoryEndpoint,
        PharmacyExpenseCategory
      )
      .pipe(catchError(this.errorHandler));
  }
  //View list of PharmacyExpenseCategory
  getPharmacyExpenseCategoryApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.PharmacyExpenseCategoryEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //View PharmacyExpenseCategory by id
  updatePharmacyExpenseCategoryApi(
    id: number | string,
    PharmacyExpenseCategory: any
  ): Observable<any> {
    return this.httpClient
      .put(
        this.BASE_URL + ApiPaths.PharmacyExpenseCategoryEndpoint + `/${id}`,
        PharmacyExpenseCategory
      )
      .pipe(catchError(this.errorHandler));
  }
  //Delete PharmacyExpenseCategory by id
  deletePharmacyExpenseCategoryApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(
        this.BASE_URL + ApiPaths.PharmacyExpenseCategoryEndpoint + `/${id}`
      )
      .pipe(catchError(this.errorHandler));
  }

  //post Add PharmacyExpense
  addPharmacyExpenseApi(PharmacyExpense: any): Observable<any> {
    return this.httpClient
      .post(this.BASE_URL + ApiPaths.PharmacyExpenseEndpoint, PharmacyExpense)
      .pipe(catchError(this.errorHandler));
  }
  //View list of PharmacyExpense
  getPharmacyExpenseApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.PharmacyExpenseEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //View PharmacyExpense by id
  updatePharmacyExpenseApi(
    id: number | string,
    PharmacyExpense: any
  ): Observable<any> {
    return this.httpClient
      .put(
        this.BASE_URL + ApiPaths.PharmacyExpenseEndpoint + `/${id}`,
        PharmacyExpense
      )
      .pipe(catchError(this.errorHandler));
  }
  //Delete PharmacyExpense by id
  deletePharmacyExpenseApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.PharmacyExpenseEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  //post Add ExpenseCategory
  addExpenseCategoryApi(ExpenseCategory: any): Observable<any> {
    return this.httpClient
      .post(this.BASE_URL + ApiPaths.ExpenseCategoryEndpoint, ExpenseCategory)
      .pipe(catchError(this.errorHandler));
  }
  //View list of ExpenseCategory
  getExpenseCategoryApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.ExpenseCategoryEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //View ExpenseCategory by id
  updateExpenseCategoryApi(
    id: number | string,
    ExpenseCategory: any
  ): Observable<any> {
    return this.httpClient
      .put(
        this.BASE_URL + ApiPaths.ExpenseCategoryEndpoint + `/${id}`,
        ExpenseCategory
      )
      .pipe(catchError(this.errorHandler));
  }
  //Delete ExpenseCategory by id
  deleteExpenseCategoryApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.ExpenseCategoryEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  //post Add Expense
  addExpenseApi(Expense: any): Observable<any> {
    return this.httpClient
      .post(this.BASE_URL + ApiPaths.ExpenseEndpoint, Expense)
      .pipe(catchError(this.errorHandler));
  }
  //View list of Expense
  getExpenseApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.ExpenseEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //View Expense by id
  updateExpenseApi(id: number | string, Expense: any): Observable<any> {
    return this.httpClient
      .put(this.BASE_URL + ApiPaths.ExpenseEndpoint + `/${id}`, Expense)
      .pipe(catchError(this.errorHandler));
  }
  //Delete Expense by id
  deleteExpenseApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.ExpenseEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  //post Add InventorySupplier
  addInventorySupplierApi(InventorySupplier: any): Observable<any> {
    return this.httpClient
      .post(
        this.BASE_URL + ApiPaths.InventorySupplierEndpoint,
        InventorySupplier
      )
      .pipe(catchError(this.errorHandler));
  }
  //View list of InventorySupplier
  getInventorySupplierApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.InventorySupplierEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //View InventorySupplier by id
  updateInventorySupplierApi(
    id: number | string,
    InventorySupplier: any
  ): Observable<any> {
    return this.httpClient
      .put(
        this.BASE_URL + ApiPaths.InventorySupplierEndpoint + `/${id}`,
        InventorySupplier
      )
      .pipe(catchError(this.errorHandler));
  }
  //Delete InventorySupplier by id
  deleteInventorySupplierApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.InventorySupplierEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }
  //post Add Inventory
  addInventoryApi(Inventory: any): Observable<any> {
    return this.httpClient
      .post(this.BASE_URL + ApiPaths.InventoryEndpoint, Inventory)
      .pipe(catchError(this.errorHandler));
  }
  //View list of Inventory
  getInventoryApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.InventoryEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //View Inventory by id
  updateInventoryApi(id: number | string, Inventory: any): Observable<any> {
    return this.httpClient
      .put(this.BASE_URL + ApiPaths.InventoryEndpoint + `/${id}`, Inventory)
      .pipe(catchError(this.errorHandler));
  }
  //Delete Inventory by id
  deleteInventoryApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.InventoryEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  // //post Add PharmacySale
  // addPharmacySaleApi(PharmacySale: any): Observable<any> {
  //   return this.httpClient
  //     .post(this.BASE_URL + ApiPaths.PharmacySaleEndpoint, PharmacySale)
  //     .pipe(catchError(this.errorHandler));
  // }
  // //View list of PharmacySale
  // getPharmacySaleApi(): Observable<any> {
  //   return this.httpClient
  //     .get(this.BASE_URL + ApiPaths.PharmacySaleEndpoint)
  //     .pipe(catchError(this.errorHandler));
  // }
  // //View PharmacySale by id
  // updatePharmacySaleApi(id: number | string, PharmacySale: any): Observable<any> {
  //   return this.httpClient
  //     .put(this.BASE_URL + ApiPaths.PharmacySaleEndpoint + `/${id}`, PharmacySale)
  //     .pipe(catchError(this.errorHandler));
  // }
  // //Delete PharmacySale by id
  // deletePharmacySaleApi(id: number | string): Observable<any> {
  //   return this.httpClient
  //     .delete(this.BASE_URL + ApiPaths.PharmacySaleEndpoint + `/${id}`)
  //     .pipe(catchError(this.errorHandler));
  // }
  // //post Add Prescription
  // addPrescriptionApi(Prescription: any): Observable<any> {
  //   return this.httpClient
  //     .post(this.BASE_URL + ApiPaths.PrescriptionEndpoint, Prescription)
  //     .pipe(catchError(this.errorHandler));
  // }
  // //View list of Prescription
  // getPrescriptionApi(): Observable<any> {
  //   return this.httpClient
  //     .get(this.BASE_URL + ApiPaths.PrescriptionEndpoint)
  //     .pipe(catchError(this.errorHandler));
  // }
  // //View Prescription by id
  // updatePrescriptionApi(id: number | string, Prescription: any): Observable<any> {
  //   return this.httpClient
  //     .put(this.BASE_URL + ApiPaths.PrescriptionEndpoint + `/${id}`, Prescription)
  //     .pipe(catchError(this.errorHandler));
  // }
  // //Delete Prescription by id
  // deletePrescriptionApi(id: number | string): Observable<any> {
  //   return this.httpClient
  //     .delete(this.BASE_URL + ApiPaths.PrescriptionEndpoint + `/${id}`)
  //     .pipe(catchError(this.errorHandler));
  // }

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
