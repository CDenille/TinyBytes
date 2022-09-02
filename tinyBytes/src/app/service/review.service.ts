import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IHttpError } from '../interface/error';
import { Review } from '../review';
import { ReviewInter } from '../interface/review';
import { LocalStorageRefService } from '../service/local-storage-ref.service'

@Injectable({
  providedIn: 'root',
})

export class ReviewService {
  constructor(private http: HttpClient,
  private localStorage: LocalStorageRefService) { }
  recipe_id!: any;
  recipeName!: any;
  userName!: any;
  review!: any;


  getReviews(recipeId: any): Observable<any> {
    return this.http
      .get<any>(`https://tinybytes.herokuapp.com/recipe/${recipeId}/reviews`)
      .pipe(catchError(this.HttpErrorHandler))
  }

  sendReview(): Observable<any>{
    this.recipe_id = Number(localStorage.getItem('recipeId'))
    this.recipeName= localStorage.getItem('recipeName')
    console.log("Id Type", typeof this.recipe_id)
    this.userName = ((document.getElementById('form-control me-2 userName') as HTMLInputElement).value);
    this.review = ((document.getElementById('form-control me-2 review') as HTMLInputElement).value);

    const newReview = {
      recipe_id: this.recipe_id,
      userName: this.userName,
      review: this.review,
      recipeName: this.recipeName
    }
    console.log("THe json", newReview)
    return this.http.post<any>(`https://tinybytes.herokuapp.com/recipe/reviews`, newReview)
      
  }

  private HttpErrorHandler(err: HttpErrorResponse): Observable<IHttpError> {
    console.log(err)
    return throwError(() => err);
  }
}