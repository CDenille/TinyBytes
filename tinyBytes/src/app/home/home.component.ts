import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Root } from '../interface/root';
import { RecipeService } from '../service/recipe.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  errorMessage: string = '';
  randomSub!: Subscription;
  dessertSub!: Subscription;
  popularSub!: Subscription;

  constructor(private recipeService: RecipeService) { }

  recipes!: Root;
  desserts!: Root;
  mostPopular!: Root;

  ngOnInit(): void {
    this.randomSub = this.recipeService.getRecipes().subscribe({
      next: recipes => this.recipes = recipes,
      error: err => this.errorMessage = err
    });
    this.dessertSub = this.recipeService.getDesserts().subscribe({
      next: desserts => this.desserts = desserts,
      error: err => this.errorMessage = err
    });
    this.popularSub = this.recipeService.getMostPopular().subscribe({
      next: mostPopular => this.mostPopular = mostPopular,
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy() {
    this.randomSub.unsubscribe();
    this.popularSub.unsubscribe();
    this.dessertSub.unsubscribe();
  }
}
