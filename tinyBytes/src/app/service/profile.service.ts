import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IProfile } from '../interface/profile';
import { LocalStorageService } from '../service/local-storage.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(
    private http: HttpClient,
    private router: Router) { }

  getUserData(userId: string | null): Observable<IProfile> {
    let thisUser = localStorage.getItem('Current User')
    let userID = localStorage.getItem('User ID')
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Authorization': `${thisUser}`
    });
    return this.http
        .get<IProfile>(`https://tinybytes-production.up.railway.app/profile/${userID}`, { headers: httpHeaders })
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
      .put<any>(`https://tinybytes-production.up.railway.app/profile/generateApi`, { email: email }, { headers: httpHeaders })
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
      .delete<any>(`https://tinybytes-production.up.railway.app/profile/${userID}`, { headers: httpHeaders });
  }

  private HttpErrorHandler(err: HttpErrorResponse) {
    console.log(err)
    return throwError(() => err);
  }
}
