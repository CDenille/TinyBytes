import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageRefService } from '../service/local-storage-ref.service';

@Component({
  templateUrl: './documentation.component.html',
  styleUrls: ['documentation.component.css'],
})
export class DocumentationComponent {
  constructor(
    private router: Router,
    private localStorage: LocalStorageRefService
  ) {}
  developer: any = false;

  ngOnInit() {
    this.developer = localStorage.getItem('ApiKey')
    if(this.developer == 'null'){
      this.developer = false
    }
  }

  endpoints = [
    {
      title: 'Top Recipies',
      url: 'http://localhost:8080/publicApi/topRecipies',
      description:
        'Returns a list containing the top favorited recipies. The list holds the spoonacular recipe id, the name of the food, and how many times it has been favorited.',
      imageUrl:
        'https://i.ibb.co/dL6yJZ1/Screenshot-2022-06-08-11-49-17-AM.png',
    },
    {
      title: 'Latest Favorited',
      url: 'http://localhost:8080/publicApi/latestFavorited',
      description:
        'Returns a list containing favorited recipies for the past week.  The list holds the spoonacular recipe id, the name of the food, and when it was favorited.',
      imageUrl:
        'https://i.ibb.co/276pkNp/Screenshot-2022-06-08-11-49-50-AM.png',
    },
    {
      title: 'Last Ten Favorited',
      url: 'http://localhost:8080/publicApi/lastTenFavorites',
      description:
        'Returns a list containing the last 10 favorited recipes.  The list holds the spoonacular recipe id, the name of the food, and when it was favorited.',
      imageUrl:
        'https://i.ibb.co/crxsgbB/Screenshot-2022-06-08-11-50-04-AM.png',
    },
  ];

  navigateToEndpoint(endpoint: string): void {
    const apiKey: any = localStorage.getItem('ApiKey')
    const url = `${endpoint}/${apiKey}`;
    window.location.href = url;
  }
}
