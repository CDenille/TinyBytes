import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IRecipeDetails, IInstructions } from '../interface/recipeDetails';
import { IHttpError } from '../interface/error';
import { IUserData } from '../interface/userData';
import { RecipeDetailsService } from '../service/recipeDetails.service';
import { RecipeService } from '../service/recipe.service';
import { ReviewComponent } from '../review/review.component';
import { LocalStorageRefService } from '../service/local-storage-ref.service';

@Component({
  templateUrl: './recipe.component.html',
  styleUrls: ['recipe.component.css'],
})
export class RecipeComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(
    private route: ActivatedRoute,
    private recipeDetailsService: RecipeDetailsService,
    private recipeService: RecipeService,
    private localStorage: LocalStorageRefService
  ) {}

  //Subscription Variables
  detailsSub!: Subscription;
  instructionsSub!: Subscription;
  nutritionSub!: Subscription;

  //Variables
  recipeId!: any;
  details!: IRecipeDetails;
  instructions!: IInstructions[];
  nutrition!: string | IHttpError;
  userData: IUserData = { favorited: false };
  team: string[] = [
    'Jorge Flores',
    'Denille Carrington',
    'Anderson Quinones',
    'Dinalisse Felicone',
  ];
  author!: string;

  //DOM
  @ViewChild('divNutritionHtml') divNutritionHtmlRef!: ElementRef;
  @ViewChild('divRecipeDescription') divRecipeDescriptionRef!: ElementRef;

  //Custom Functions
  randomize(arr: string[]): string {
    return arr[Math.floor(Math.random() * 4)];
  }
  printRecipe(): void {
    window.print();
  }
  bookmarkRecipe(): void {
    const originalValue = this.userData.favorited;
    this.userData.favorited = !originalValue;

    const next = (response: any | IHttpError) => {
      console.log('response Data: ', response);
    }

    const error = (error: IHttpError) => {
      console.error(error)
      this.userData.favorited = originalValue;
    }

    if (!originalValue) {
      this.recipeService.addFavorite(this.recipeId!, this.details.title).subscribe({ next, error });
    }
    else {
      this.recipeService.deleteFavorite(this.recipeId!).subscribe({ next, error });
    }
  }

  //Life Cycle
  ngOnInit(): void {
    //Initializations
    this.recipeId = this.route.snapshot.paramMap.get('recipeId');
    this.author = this.randomize(this.team);
    localStorage.setItem('recipeId', this.recipeId);

    //Subscriptions
    this.detailsSub = this.recipeDetailsService
      .getRecipeDetails(this.recipeId)
      .subscribe({
        next: (details: IRecipeDetails | IHttpError) => {
          console.log('Details Data: ', details);
          this.details = <IRecipeDetails>details;
          localStorage.setItem('recipeName', this.details.title);
        },
        // error: (err: IHttpError) => console.error(err.detailedMessage),
      });
    this.instructionsSub = this.recipeDetailsService
      .getRecipeInstructions(this.recipeId)
      .subscribe({
        next: (instructions: IInstructions[] | IHttpError) => {
          console.log('Instructions Data: ', <IInstructions[]>instructions);
          this.instructions = <IInstructions[]>instructions;
        },
        // error: (err: IHttpError) => console.error(err.detailedMessage),
      });
    this.nutritionSub = this.recipeDetailsService
      .getHTMLNutritionFacts(this.recipeId)
      .subscribe({
        next: (nutritionHtml: string | IHttpError) => {
          console.log('Nutrition HTML: ', nutritionHtml);
          this.nutrition = <string>nutritionHtml;
        },
      });
  }

  ngAfterViewInit(): void {
    //DOM Manipulation
    if (this.divNutritionHtmlRef.nativeElement) {
      this.divNutritionHtmlRef.nativeElement.innerHTML = this.nutrition;
    }
    if (this.divRecipeDescriptionRef.nativeElement) {
      this.divRecipeDescriptionRef.nativeElement.innerHTML =
        this.details.summary;
    }
  }

  ngOnDestroy(): void {
    localStorage.removeItem('recipeName')
    localStorage.removeItem('recipeId');
    this.detailsSub.unsubscribe();
    this.instructionsSub.unsubscribe();
    this.nutritionSub.unsubscribe();
  }
}
