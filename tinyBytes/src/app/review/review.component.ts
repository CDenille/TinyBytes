import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../service/review.service';
import { Router } from '@angular/router';
import { IReview } from '../interface/review';
import { Review } from '../review'
import { UntypedFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})
export class ReviewComponent  {
  constructor(
    private reviewService: ReviewService,
    private router: Router,
    private formBuilder: UntypedFormBuilder,
  ) { }
  
  reviewForm = this.formBuilder.group({
    userName: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
    review: ['', [Validators.required, Validators.pattern('[a-zA-Z]+'), Validators.minLength(6)]]
  })

  reviews!: IReview;
  newReview = new Review;

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
    console.log('Form value',this.reviewForm)
    this.reviewService.sendReview(this.reviewForm.value)
  .subscribe(data =>{console.log(data)});
  }
}
