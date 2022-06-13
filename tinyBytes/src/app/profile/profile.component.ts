import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IHttpError } from '../interface/error';
import { IProfile } from '../interface/profile';
import { GenerateApiKeyService } from '../service/generateApiKey.service';
import { ProfileService } from '../service/profile.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageRefService } from '../service/local-storage-ref.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private generateApiKeyService: GenerateApiKeyService,
    private router: Router,
    private http: HttpClient,
    private localStorage: LocalStorageRefService

  ) {}

  userId!: string | null;
  profileSub!: Subscription;
  profile!: IProfile;
  

  ngOnInit(): void {
    this.profileSub = this.profileService.getUserData(this.userId).subscribe({
      next: (userData: IProfile | IHttpError) => {
        console.log('Profile Data', userData)
        this.profile = <IProfile>userData;
      },
    });
  }
  generateApiKey(){
    this.generateApiKeyService.updateApiKey(this.profile.email).subscribe({
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
