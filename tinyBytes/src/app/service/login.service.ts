import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Observable, throwError, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { LocalStorageRefService } from '../service/local-storage-ref.service';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(
        private router: Router,
        private http: HttpClient,
        private localStorage: LocalStorageRefService) { }

    //alerts
    usernamePasswordError: boolean = false;

    userID!: string;

    login(options: any, email: string, password: string): void {
        const requestObservable: Observable<any> = this.http.post<any>(
            'https://tinybytes-production.up.railway.app/logIn',
            {
                "email": email,
                "password": password
            },
            options)
        requestObservable.pipe(catchError(this.httpErrorHandler)).subscribe({
            next: (response: any) => {
                console.log("Here's the data", response)
                if (response.status == 401) {
                    this.usernamePasswordError = true
                } else {
                    this.userID = response.id
                    localStorage.setItem('User ID', this.userID);
                    localStorage.setItem('ApiKey', response.apiKey)
                    console.log("User if from localStorage", localStorage.getItem('User ID'))
                    this.router.navigate(['http://localhost:4200'])
                }
            }
        })
    }

    httpErrorHandler(err: HttpErrorResponse): Observable<any> {
        console.log('error code', err.status);
        if (err.status == 401) {
            //password/username mismatch
            return of(err);
        } else {
            //all other error codes
            return throwError(() => err)
        }
    }
}