import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IHttpError } from '../interface/error';
import { IProfile } from '../interface/profile';
import { LocalStorageService } from '../service/local-storage.service';


@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(
    private http: HttpClient) { }

  getUserData(userId: string | null): Observable<IProfile | IHttpError> {
    let thisUser = localStorage.getItem('Current User')
    let userID = localStorage.getItem('User ID')
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Headers': 'Content-Type',
    'Authorization': `${thisUser}`
    });
    return this.http
      .get<IProfile>(`http://localhost:8080/profile/${userID}`, {headers:httpHeaders})
      .pipe(catchError(this.HttpErrorHandler));
  }

  getApiKey(email: string): Observable<any> {
    const thisUser = localStorage.getItem('Current User')
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Headers': 'Content-Type',
    'Authorization': `${thisUser}`
    });
    return this.http
      .put(`https://tinybytes-production.up.railway.app/profile/generateApi`, {email: email}, {headers:httpHeaders})
      .pipe(catchError(this.HttpErrorHandler));
  }

  deleteProfile(): Observable<any> {
    let thisUser = localStorage.getItem('Current User')
    let userID = localStorage.getItem('User ID')
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Headers': 'Content-Type',
    'Authorization': `${thisUser}`
    });
    localStorage.clear();
    return this.http
      .delete<any>(`https://tinybytes-production.up.railway.app/profile/${userID}`, {headers:httpHeaders});
  }

  private HttpErrorHandler(err: HttpErrorResponse): Observable<IHttpError> {
    console.log(err)
    return throwError(() => err);
  }
}
