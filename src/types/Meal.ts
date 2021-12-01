import Recipe from "./Recipe";
import { Ingredient } from "./Recipe";

export class Meal {
  private mealEaters: number;
  private mealRecipe: Array<Recipe>;

  // constructor(eaters:number,listRecipe:Array<Recipe>){
  //     this.mealEaters=eaters;
  //     this.mealRecipe=listRecipe;
  // }
  constructor(eaters: number) {
    this.mealEaters = eaters;
    this.mealRecipe = [];
  }

  addRecipe(newRecipe: Recipe) {
    //Automacally scale the recipe to match with the number of eater for this meal
    let RecipeAux: Recipe = newRecipe.upScaleRecipe(this.mealEaters);
    this.mealRecipe.push(RecipeAux);
  }

  getmealEaters(): number {
    return this.mealEaters;
  }

  setEaters(newEaters: number) {
    this.mealEaters = newEaters;
  }

  getmealRecipe(): Array<Recipe> {
    return this.mealRecipe;
  }

  setmealRecipe(newListRecipe: Array<Recipe>) {
    this.mealRecipe = newListRecipe;
  }

  getMealIngredients(): Array<[Ingredient, number]> {
    var listIngredients: Array<[Ingredient, number]> = [];

    for (var i = 0; i < this.mealRecipe.length; i++) {
      var IngredientInRecipeI: Array<[Ingredient, number]> =
        this.mealRecipe[i].getIngredients();
      for (var j = 0; j < IngredientInRecipeI.length; j++) {
        var stop: number = 0;
        for (var k = 0; k < listIngredients.length && stop != 1; k++) {
          if (listIngredients[k][0] == IngredientInRecipeI[j][0]) {
            //already in the list -> need to add the quantity to the previous quantity
            listIngredients[k][1] += IngredientInRecipeI[j][1];
            stop = 1;
          }
        }
        //we didnt find the ingredient in listIngredients so we need to add it.
        listIngredients.push(IngredientInRecipeI[j]);
      }
    }
    return listIngredients;
  }
}
