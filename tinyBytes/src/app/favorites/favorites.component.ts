import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../service/favorites.service';
import { LocalStorageRefService } from '../service/local-storage-ref.service';

@Component({
  templateUrl: './favorites.component.html',
  styleUrls: ['../search/search.component.css'],
})
export class FavoritesComponent implements OnInit {
  constructor(
    private favoritesService: FavoritesService,
    private localStorage: LocalStorageRefService
  ) {}

  favorites!: any[];

  ngOnInit(): void {
    //Get User ID trhough local storage (must be number or convert)
    const userId = localStorage.getItem('User ID');
    //Subscriptions
    this.favoritesService.getFavorites(userId).subscribe({
      next: (data) => {
        this.favorites = data.data;
      },
    });
  }
}
