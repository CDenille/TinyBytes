import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReviewService } from '../service/review.service';
import { Router } from '@angular/router';
import { IReview, ReviewInter } from '../interface/review';
import { Subscription, windowWhen } from 'rxjs';

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
  icons: string[] = [
    // 'https://www.flaticon.com/free-icon/mixing_2253443?related_id=2253443&origin=search',
    // https://www.flaticon.com/free-icon/mixing_2253443?related_id=2253443&origin=search'
    // 'https://www.flaticon.com/free-icon/mixing_2253443?related_id=2253443&origin=search'
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTit2qrvJTMp3hxDAIQT3ZzoxEw8J6OUU5uKA&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNooKYwVu6SYfgQAE6-KiNOz_3nSkyKMHiVw&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlAg7yW35_YAfK42L5sUydIhi3175iUXaZHg&usqp=CAU',
    'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSvFoN5fyvqTO0Om-skrpAmGxKldN28j7g5kb8w4cBdtZJqJuVz',
    'https://t3.ftcdn.net/jpg/04/26/13/92/360_F_426139222_xZ74I0LZQUcdKOsvvmdfrd0tE2JKl2JZ.jpg'

  ];

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
    const recipeId = localStorage.getItem('recipeId');
    this.sendReviewSub=this.reviewService.sendReview()
      .subscribe({
        next: newReview => {
          this.newReview = newReview,
            console.log("Here is the new reivews: ", this.newReview)
            this.router.navigate([`https://tinybytes.herokuapp.com/recipe/${recipeId}/reviews`])
        },
      })
    // window.location.reload()
  }

  ngOnDestroy() {
    this.reviewSub.unsubscribe();
    this.sendReviewSub.unsubscribe();
  }
}
