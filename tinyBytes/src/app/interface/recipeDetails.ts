//GET https://api.spoonacular.com/recipes/{id}/information

export interface IRecipeDetails {
  id: number;
  title: string;
  image: string;
  servings: number;
  readyInMinutes: number;
  summary: string;
  extendedIngredients: IIngredients[];
  //Stretch goals, would include if vegan, vegetarian, etc based on icon.
  dairyFree: boolean;
  ketogenic: boolean;
  vegetarian: boolean;
  glutenFree: boolean;
  vegan: boolean;
  veryHealthy: boolean;
  whole30: boolean;
}

export interface IIngredients {
  original: string;
}

//GET https://api.spoonacular.com/recipes/{id}/analyzedInstructions
// Returns an array of objs with name and steps as keys
// Each step has step number, step instructions
export interface IInstructions {
  name: string;
  steps: ISteps[];
}

export interface ISteps {
  number: number;
  step: string;
}
