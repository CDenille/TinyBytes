import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IHttpError } from '../interface/error';

@Injectable({
  providedIn: 'root',
})

export class FavoritesService {
  constructor(private http: HttpClient) {}

  getFavorites(userId: string | null): Observable<any> {
    return this.http
      .get<any>(`https://tinybytes-production.up.railway.app/user/${userId}/favorites`)
      .pipe(catchError(this.HttpErrorHandler))
  }

  private HttpErrorHandler(err: HttpErrorResponse): Observable<IHttpError> {
    console.log(err)
    return throwError(() => err);
  }
}