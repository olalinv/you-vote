import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  get = (path: string, params: HttpParams = new HttpParams()): Observable<any> => {
    return this.http.get(path, { params }).pipe(catchError(this.formatErrors));
  }

  post = (path: string, body: Object = {}): Observable<any> => {
    return this.http.post(path, JSON.stringify(body), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(catchError(this.formatErrors));
  }

  put = (path: string, body: Object = {}): Observable<any> => {
    return this.http.put(path, JSON.stringify(body), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(catchError(this.formatErrors));
  }

  patch = (path: string, body: Object = {}): Observable<any> => {
    return this.http.patch(path, JSON.stringify(body), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(catchError(this.formatErrors));
  }

  delete = (path: string): Observable<any> => {
    return this.http.delete(path).pipe(catchError(this.formatErrors));
  }

  options = (path: string, params: HttpParams = new HttpParams()): Observable<any> => {
    return this.http.options(path, { params }).pipe(catchError(this.formatErrors));
  }

  formatErrors = (error: any) => {
    return throwError(error.error);
  }
}
