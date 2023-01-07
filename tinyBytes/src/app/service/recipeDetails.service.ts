import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IHttpError } from '../interface/error';
import { IRecipeDetails, IInstructions } from '../interface/recipeDetails';

@Injectable({
  providedIn: 'root',
})
export class RecipeDetailsService {
  constructor(private http: HttpClient) {}

  recipeDetailsUrl!: string;
  recipeInstructionsUrl!: string;
  recipeNutritionUrl!: string;

  getRecipeDetails(recipeId: string | null): Observable<IRecipeDetails | IHttpError> {
    return this.http
      .get<IRecipeDetails>(`https://tinybytes-production.up.railway.app/recipeDetails/${recipeId}`)
      .pipe(
        // map((details) => {
        //   let container!: IRecipeDetails;
        //   container.id = details.id;
        //   container.title = details.title;
        //   container.image = details.image;
        //   container.servings = details.servings;
        //   container.readyInMinutes = details.readyInMinutes;
        //   container.summary = details.summary;
        //   container.extendedIngredients = details.extendedIngredients;
        // return container;
      // }),
        catchError(this.HttpErrorHandler)
    );
  }

  getRecipeInstructions(recipeId: string | null): Observable<IInstructions[] | IHttpError> {
    return this.http
      .get<IInstructions[]>(`https://tinybytes-production.up.railway.app/recipeInstructions/${recipeId}`)
      .pipe(catchError(this.HttpErrorHandler))
  }

  getHTMLNutritionFacts(recipeId: string | null): Observable<string | IHttpError> {
    return this.http
      .get(`https://tinybytes-production.up.railway.app/HTMLNutritionFacts/${recipeId}`, { responseType: 'text' })
      .pipe(catchError(this.HttpErrorHandler))
  }

  private HttpErrorHandler(err: HttpErrorResponse): Observable<IHttpError>{
    let customError!: IHttpError;
    customError.statusCode = err.status;
    customError.detailedMessage = err.message;
    customError.statusText = err.statusText; 
    customError.dataType = err.name;
    customError.componentMessage = err.error;
    console.log('Error message: ', customError.detailedMessage)
    return throwError(()=>customError);
  }

}
