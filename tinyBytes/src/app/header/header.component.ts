import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../service/local-storage.service';

@Component({
  selector: 'Header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private router: Router) { }

  query!: any;
  userID!: any;
  logout: boolean = false;

  toggleLogout(): void {
    this.logout = !this.logout;
  }
  goToProfile() {
    this.userID = localStorage.getItem('User ID');
    this.router.navigate(['/profile', this.userID])
  }

  startSearch() {
    this.query = ((document.getElementById('form-control me-2') as HTMLInputElement).value);
    this.router.navigate(['/search', this.query])
  }
}