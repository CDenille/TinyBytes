import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EnrollmentService } from '../service/enrollment.service';
import { LoginService } from '../service/login.service';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { IUser } from '../interface/user';
import { Router } from '@angular/router';
import { LocalStorageRefService } from '../service/local-storage-ref.service';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private http: HttpClient,
    private localStorage: LocalStorageRefService) { }


  private enrollmentService: EnrollmentService = new EnrollmentService(this.http);
  private loginService: LoginService = new LoginService(this.router, this.http, this.localStorage);

  newUser!: IUser;
  email!: string;
  password!: string;
  credentials!: string;
  basic!: string;
  userID!: string;

  signupForm = this.formBuilder.group({
    firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
    lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  submit() {
    console.log('Form value', this.signupForm.value.firstName);
    this.enrollmentService.enrollUser(this.signupForm.value)
      .subscribe({
        next: user => {
          this.newUser = user,
            console.log('Heres the new user', this.newUser)
        }
      });

    //the user should be signed in once signing up
    this.localStorage.localStorage.clear();
    this.credentials = this.signupForm.value.email + ":" + this.signupForm.value.password;
    this.basic = "Basic " + btoa(this.credentials);
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': this.basic,
    });
    let options = { headers: httpHeaders };
    localStorage.setItem('Current User', this.basic);
    console.log(httpHeaders);
    console.log(localStorage.getItem('Current User'));
    console.log("Basic: ", this.basic)
    this.loginService.login(options, this.signupForm.value.email, this.signupForm.value.password);
  }
}