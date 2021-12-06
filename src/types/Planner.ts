import { Meal } from "./Meal";
import { Ingredient } from "./Recipe";
import { plannerKey } from "../config/database";

export class Planner {
  //attributs
  private today: Date;
  private mealsArray: Array<Meal>;

  //methods
  constructor() {
    this.today = new Date();

    const meals = localStorage.getItem(plannerKey);

    if (meals == null) {
      this.mealsArray = [];
    } else {
      this.mealsArray = JSON.parse(meals).map((meal: any) =>
        Meal.deserialize(meal)
      );
    }
  }

  /**
   * Refreshes the meal list on the database
   */
  refreshMeals() {
    const meals = localStorage.getItem(plannerKey);

    if (meals == null) {
      this.mealsArray = [];
    } else {
      this.mealsArray = JSON.parse(meals).map((meal: any) =>
        Meal.deserialize(meal)
      );
    }
  }

  /**
   *
   * @param dateStart - Start not included
   * @param dateEnd - Day not included
   * @returns
   */
  getPlannedMealsForPeriod(dateStart: Date, dateEnd: Date): Array<Meal> {
    let resultArray: Array<Meal> = [];

    this.mealsArray.forEach((meal) => {
      if (
        this.isAfter(meal.getMealDate(), dateStart) &&
        this.isBefore(meal.getMealDate(), dateEnd)
      ) {
        return meal;
      }
    });
    return resultArray;
  }

  getPlannedsMealsToday(): Array<Meal> {
    this.updateToday();
    var resultArray: Array<Meal> = [];
    for (let index = 0; index < this.mealsArray.length; index++) {
      const element = this.mealsArray[index];
      if (this.isDateEqual(element.getMealDate(), this.today)) {
        resultArray.push(element);
      }
    }
    return resultArray;
  }

  getAllPlannedMeals(): Array<Meal> {
    return this.mealsArray;
  }

  generateGroceriesForPeriod(dateStart: Date, dateEnd: Date) {
    var listIngredients: Array<[Ingredient, number]> = [];
    var listMeal: Array<Meal> = [];
    listMeal = this.getPlannedMealsForPeriod(dateStart, dateEnd);

    for (var i = 0; i < listMeal.length; i++) {
      var meal: Meal = listMeal[i];
      var IngredientInRecipeI: Array<[Ingredient, number]> =
        meal.getMealIngredients();
      for (var j = 0; j < IngredientInRecipeI.length; j++) {
        var stop: number = 0;
        for (var k = 0; k < listIngredients.length && stop !== 1; k++) {
          if (listIngredients[k][0] === IngredientInRecipeI[j][0]) {
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

  generateGroceriesToday(): Array<[Ingredient, number]> {
    var listIngredients: Array<[Ingredient, number]> = [];
    var listMeal: Array<Meal> = [];
    listMeal = this.getPlannedsMealsToday();

    console.log(this.getPlannedsMealsToday());

    for (var i = 0; i < listMeal.length; i++) {
      var meal: Meal = listMeal[i];
      var IngredientInRecipeI: Array<[Ingredient, number]> =
        meal.getMealIngredients();
      for (var j = 0; j < IngredientInRecipeI.length; j++) {
        var stop: number = 0;
        for (var k = 0; k < listIngredients.length && stop !== 1; k++) {
          if (listIngredients[k][0] === IngredientInRecipeI[j][0]) {
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

  addMeal(newMeal: Meal) {
    this.mealsArray.push(newMeal);
    localStorage.setItem(plannerKey, JSON.stringify(this.mealsArray));
    this.refreshMeals();
  }

  deleteMeal(meal: Meal) {
    const index = this.mealsArray.findIndex(
      (m) => m.serialize() === meal.serialize()
    );

    if (index !== -1) {
      this.mealsArray.splice(index, 1);
      localStorage.setItem(plannerKey, JSON.stringify(this.mealsArray));
      this.refreshMeals();
    }
  }

  isBefore(date1: Date, date2: Date) {
    return date1 < date2;
  }

  isAfter(date1: Date, date2: Date) {
    return date1 > date2;
  }

  isDateEqual(date1: Date, date2: Date) {
    return date1.toLocaleDateString() === date2.toLocaleDateString();
  }

  private updateToday() {
    this.today = new Date();
  }
}
