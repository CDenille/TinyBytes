import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { LocalStorageRefService } from '../service/local-storage-ref.service';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'Login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private loginService: LoginService,
    private localStorage: LocalStorageRefService) { }

  email!: string;
  password!: string;
  credentials!: string;
  basic!: string;
  userID!: string;

  //alerts
  usernamePasswordError: boolean = false;

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
    this.usernamePasswordError = this.loginService.login(options, this.email, this.password);
  }
}
