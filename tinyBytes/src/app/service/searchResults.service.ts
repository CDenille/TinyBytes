import { HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { ISearchResults } from "../interface/searchResults";
import { LocalStorageService } from '../service/local-storage.service';

@Injectable({
    providedIn:'root'
})
export class SearchService{
    constructor(private http: HttpClient) { }

    search(query: string): Observable<ISearchResults>{
        return this.http.get<ISearchResults>(`https://tinybytes-production.up.railway.app/search/${query}`).pipe(
            catchError(this.handleError)
        )
    }
    private handleError(err:HttpErrorResponse){
        let errorMessage='';
        if( err.error instanceof ErrorEvent){
            errorMessage = `an error occured: ${err.error.message}`
        }else{
            errorMessage = `server returned code: ${err.status}, error message is: ${err.message}`
        }
        console.error(errorMessage);
        return throwError(errorMessage)
    }
}