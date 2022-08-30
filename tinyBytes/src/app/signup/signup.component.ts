import { Component } from '@angular/core';
import { EnrollmentService } from '../service/enrollment.service';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent{
  signupForm = this.formBuilder.group({
    firstName:['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
    lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

newUser = new User;
  constructor(
    private enrollmentService:EnrollmentService,
    private formBuilder: UntypedFormBuilder,
    private router: Router
    ){}

 
  onSubmit(){
  console.log('Form value',this.signupForm)
    this.enrollmentService.enroll(this.signupForm.value)
  .subscribe(data =>{console.log(data)});
    this.router.navigate(['https://tinybytes.herokuapp.com/'])
  }
}