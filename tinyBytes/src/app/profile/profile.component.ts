import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProfile } from '../interface/profile';
import { ProfileService } from '../service/profile.service';
import { LocalStorageRefService } from '../service/local-storage-ref.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  constructor(
    private profileService: ProfileService,
    private router: Router,
  ) {}

  userId!: string | null;
  profileSub!: Subscription;
  profile!: IProfile;
  

  ngOnInit(): void {
    this.profileSub = this.profileService.getUserData(this.userId).subscribe({
      next: profileData => {
        this.profile = profileData;
      },
    });
  }
  generateApiKey(){
    console.log('method call')
    this.profileService.getApiKey(this.profile.email).subscribe({
      next:()=>{
        console.log('key generated')
      }
    })
    window.location.reload()
  }
  
  deleteUser() {
    this.profileService.deleteProfile().subscribe({
      next: () => {
        console.log('User delete')
      }
    })
    this.router.navigate(['/signup'])
  } 

  ngOnDestroy(): void {
    this.profileSub.unsubscribe();
  }
}
