import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../service/review.service';
import { Router } from '@angular/router';
import { IReview } from '../interface/review';

@Component({
  selector: 'review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})
export class ReviewComponent  {
  constructor(
    private reviewService: ReviewService,
    private router: Router
  ) { }
  

  reviews!: IReview;

  ngOnInit(): void {
    //Get User ID trhough local storage (must be number or convert)
    const recipeId = localStorage.getItem('recipeId');
    //Subscriptions
    this.reviewService.getReviews(recipeId).subscribe({
      next: reviews => {
        this.reviews = reviews,
        console.log("RecipeId: " , recipeId)
        console.log("Here are the reivews: " , this.reviews)
      },
    });
  }

  onSubmit() {
    this.reviewService.sendReview()
      .subscribe(data => { console.log("Here is the new reivew: ", data) });
  }
}
