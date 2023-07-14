import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, Subscription, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { LocalStorageRefService } from '../service/local-storage-ref.service';
import { IUser } from "../interface/user";
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'Login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  constructor(
    private router: Router,
    private http: HttpClient,
    private localStorage: LocalStorageRefService) {}

  email! : string;
  password!: string;
  credentials!: string;
  basic!: string;
  userID!: string;

  //alerts
  usernamePasswordError: boolean = false;

  //subscription
  loginSub!: Subscription;

  ngOnInit() {
    this.localStorage.localStorage.clear();
  }

  login() {
    this.email = ((document.getElementById('floatingInput') as HTMLInputElement).value);
    this.password = ((document.getElementById('floatingPassword') as HTMLInputElement).value);
    this.credentials = this.email + ":" + this.password;
    this.basic = "Basic " + btoa(this.credentials);
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': this.basic,
    });
    let options = { headers: httpHeaders };
    localStorage.setItem('Current User', this.basic);
    console.log(httpHeaders);
    console.log(localStorage.getItem('Current User'));
    console.log("Basic: ",this.basic)
    this.loginService(options);
  }

  loginService(options: any): void{
    const requestObservable: Observable<any> = this.http.post<any>(
      'https://tinybytes-production.up.railway.app/logIn', 
      { 
        "email": this.email, 
        "password": this.password
      }, 
      options)
    requestObservable.pipe(catchError(this.httpErrorHandler)).subscribe({
        next: (response: any) => { 
          console.log("Here's the data", response)
          if(response.status == 401){
            this.usernamePasswordError = true
          } else {
            this.userID = response.id
            localStorage.setItem('User ID', this.userID);
            localStorage.setItem('ApiKey', response.apiKey)
            console.log("User if from localStorage" , localStorage.getItem('User ID'))
            this.router.navigate(['http://localhost:4200'])
          }
        }
    })
  }

  signUp() {
    this.router.navigate(['http://localhost:4200/signup'])
  }

  httpErrorHandler(err:HttpErrorResponse): Observable<any>{
    console.log('error code', err.status);
    if(err.status == 401){
      //password/username mismatch
      return of(err);
    } else {
      //all other error codes
      return throwError(()=> err)
    }
  }

}