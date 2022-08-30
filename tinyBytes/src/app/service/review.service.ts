import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IHttpError } from '../interface/error';
import { Review } from '../review';
import { LocalStorageRefService } from '../service/local-storage-ref.service'

@Injectable({
  providedIn: 'root',
})

export class ReviewService {
  constructor(private http: HttpClient,
  private localStorage: LocalStorageRefService) { }
  recipe_id!: any;
  userName!: any;
  review!: any;


  getReviews(recipeId: any): Observable<any> {
    return this.http
      .get<any>(`https://tinybytes.herokuapp.com/recipe/${recipeId}/reviews`)
      .pipe(catchError(this.HttpErrorHandler))
  }

  sendReview() {
    this.recipe_id = localStorage.getItem('recipeId')
    this.userName = ((document.getElementById('userNameInput') as HTMLInputElement).value);
    this.review = ((document.getElementById('reviewInput') as HTMLInputElement).value);
    console.log("Review info", this.recipe_id, this.userName, this.review);

    const newReview = {
      recipe_id: this.recipe_id,
      userName: this.userName,
      review: this.review
    }
    console.log("THe json", newReview)
    return this.http.post<any>(`https://tinybytes.herokuapp.com/recipe/reviews`, { newReview })
  }

  private HttpErrorHandler(err: HttpErrorResponse): Observable<IHttpError> {
    console.log(err)
    return throwError(() => err);
  }
}