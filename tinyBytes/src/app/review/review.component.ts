import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReviewService } from '../service/review.service';
import { Router } from '@angular/router';
import { IReview, ReviewInter } from '../interface/review';
import { Subscription } from 'rxjs';

@Component({
  selector: 'review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})
export class ReviewComponent implements OnInit, OnDestroy  {
  constructor(
    private reviewService: ReviewService,
    private router: Router
  ) { }
  

  reviews!: IReview;
  newReview!: ReviewInter;
  reviewSub!: Subscription;
  sendReviewSub!: Subscription;

  ngOnInit(): void {
    //Get User ID trhough local storage (must be number or convert)
    const recipeId = localStorage.getItem('recipeId');
    //Subscriptions
   this.reviewSub= this.reviewService.getReviews(recipeId).subscribe({
      next: reviews => {
        this.reviews = reviews,
        console.log("RecipeId: " , recipeId)
        console.log("Here are the reivews: " , this.reviews)
      },
    });
  }

  Review() {
    this.sendReviewSub=this.reviewService.sendReview()
      .subscribe({
        next: newReview => {
          this.newReview = newReview,
          console.log("Here is the new reivews: " , this.reviews)
        },
      })
  }

  ngOnDestroy() {
    this.reviewSub.unsubscribe();
    this.sendReviewSub.unsubscribe();
  }
}
