import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from "rxjs/operators";
import { User } from "../user";

@Injectable({
    providedIn: 'root'
})
export class EnrollmentService {
    url = "https://tinybytes.onrender.com/chefs/" //url to post to
    constructor(private _http: HttpClient) { }

    enrollUser(user: User): Observable<any> {
        const headers = { 'content-type': 'application/json' }
        const body = JSON.stringify(user)
        return this._http.post<any>(this.url, body, { 'headers': headers }).pipe(
            catchError(this.handleError)
        )
    }

    private handleError(err: HttpErrorResponse) {
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            errorMessage = `an error occured: ${err.error.message}`
        } else {
            errorMessage = `server returned code: ${err.status}, error message is: ${err.message}`
        }
        console.error(errorMessage);
        return throwError(errorMessage)
    }
}