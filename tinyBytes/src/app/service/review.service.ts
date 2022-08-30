import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IHttpError } from '../interface/error';
import { Review } from '../review';

@Injectable({
  providedIn: 'root',
})

export class ReviewService {
  constructor(private http: HttpClient) {}

  getReviews(recipeId: any): Observable<any> {
    return this.http
      .get<any>(`https://tinybytes.herokuapp.com/recipe/${recipeId}/reviews`)
      .pipe(catchError(this.HttpErrorHandler))
  }

  sendReview(review:Review) {
    const body = JSON.stringify(review)
    return this.http.post<any>(`https://tinybytes.herokuapp.com/recipe/reviews`, body)
  }

  private HttpErrorHandler(err: HttpErrorResponse): Observable<IHttpError> {
    console.log(err)
    return throwError(() => err);
  }
}