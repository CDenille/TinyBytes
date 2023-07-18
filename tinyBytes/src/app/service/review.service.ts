import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IHttpError } from '../interface/error';
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
  icons: string[] = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTit2qrvJTMp3hxDAIQT3ZzoxEw8J6OUU5uKA&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNooKYwVu6SYfgQAE6-KiNOz_3nSkyKMHiVw&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlAg7yW35_YAfK42L5sUydIhi3175iUXaZHg&usqp=CAU',
    'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSvFoN5fyvqTO0Om-skrpAmGxKldN28j7g5kb8w4cBdtZJqJuVz',
    'https://t3.ftcdn.net/jpg/04/26/13/92/360_F_426139222_xZ74I0LZQUcdKOsvvmdfrd0tE2JKl2JZ.jpg'

  ];
  yourIcon!: string;

  randomize(arr: string[]): string {
    return arr[Math.floor(Math.random() * 5)];
  }


  getReviews(recipeId: any): Observable<any> {
    return this.http
      .get<any>(`https://tinybytes-production.up.railway.app/recipe/${recipeId}/reviews`)
      .pipe(catchError(this.HttpErrorHandler))
  }

  sendReview(): Observable<any> {
    this.yourIcon = this.randomize(this.icons);
    this.recipe_id = Number(localStorage.getItem('recipeId'))
    this.recipeName = localStorage.getItem('recipeName')
    this.userName = ((document.getElementById('form-control me-2 userName') as HTMLInputElement).value);
    this.review = ((document.getElementById('form-control me-2 review') as HTMLInputElement).value);

    const newReview = {
      recipe_id: this.recipe_id,
      userName: this.userName,
      review: this.review,
      recipeName: this.recipeName,
      image: this.yourIcon
    }
    return this.http.post<any>(`https://tinybytes-production.up.railway.app/recipe/reviews`, newReview)

  }

  private HttpErrorHandler(err: HttpErrorResponse): Observable<IHttpError> {
    console.log(err)
    return throwError(() => err);
  }
}