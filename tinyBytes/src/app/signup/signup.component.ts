import { Component } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { EnrollmentService } from '../service/enrollment.service';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { IUser } from '../interface/user';
import { Router } from '@angular/router';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private http: HttpClient) { }

    
  private enrollmentService: EnrollmentService = new EnrollmentService(this.http);

  newUser!: IUser;

  signupForm = this.formBuilder.group({
    firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
    lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  submit() {
    console.log('Form value', this.signupForm);
    this.enrollmentService.enrollUser(this.signupForm.value)
      .subscribe({
        next: user => { 
          this.newUser = user,
          console.log('Heres the new user', this.newUser)
        }
      });
    this.router.navigate(['http://localhost:4200'])
  }
}