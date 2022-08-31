export interface IReview{
  message: string
  status: number
  data: ReviewInter[]
}
  
export interface ReviewInter {
  recipe_id: number
  userName: string
  review:string
}