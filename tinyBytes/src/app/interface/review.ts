export interface IReview{
  message: string
  status: number
  data: ReviewInter[]
}
  
export interface ReviewInter {
  recipe_id: number
  recipeName: string
  userName: string
  review: string
  image:string
}