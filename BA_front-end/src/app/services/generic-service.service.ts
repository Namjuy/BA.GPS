import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
////Name   Date       Comments
////duypn  19/3/2024  create
export class GenericService<T> {
  
  // initalize root api url 
  private apiUrl = 'http://localhost:5086/UserApi';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  // get all 
  getAll(pageIndex: number, pageSize: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
      { headers: this.headers }
    );
  }

  // search
  search(
    inputValue: string,
    type: string,
    startDate?: string,
    endDate?: string,
    gender?: string,
    pageIndex?: number,
    pageSize?: number
  ): Observable<any> {
   
    let url = `${this.apiUrl}/search`;

    return this.http.post<any>(
      url,
      { inputValue, type, startDate, endDate, gender, pageIndex, pageSize },
      { headers: this.headers }
    );
  }

  //create
  create(newItem: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, newItem, { headers: this.headers });
  }

  //update
  update(itemId: string, updatedItemData: any): Observable<T> {
    const url = `${this.apiUrl}/${itemId}`;
    return this.http.put<T>(url, updatedItemData, { headers: this.headers });
  }

  //delete
  delete(itemId: string): Observable<any> {
    const url = `${this.apiUrl}/ban/${itemId}`;
    return this.http.put(url, { headers: this.headers }).pipe(
      catchError((error: any) => {
        console.error('Error deleting item:', error);
        return throwError(error);
      })
    );
  }

  //check exist
  checkExist(userName: string): Observable<any> {
    return this.http.get<T[]>(`${this.apiUrl}/checkExist?value=${userName}`, {
      headers: this.headers,
    });
  }
}
