import { Meal } from "./Meal";
import { myDate } from "./myDate";
import { Ingredient } from "./Recipe";

export class planner{
    //attributs
    private today : myDate;
    private mealsArray: any[];
  
    //methods
    constructor(){
        let dateTime = new Date();
        this.today = new myDate(dateTime.getDay(), dateTime.getMonth(), dateTime.getFullYear());
        this.mealsArray = [];
    }

    getPlannedMealsForPeriod(dateStart: myDate, dateEnd: myDate): Array<[Meal]>{
        var resultArray: Array<[Meal]> = [];
        for (let index = 0; index < this.mealsArray.length; index++) {
            const element = this.mealsArray[index];
            if(this.compareDateSup(dateStart,element.date) && this.compareDateSup(element.date,dateEnd)){
                resultArray.push(element.meal);
            }
        }
        return resultArray;
    }

    getPlannedsMealsToday(): Array<[Meal]>{
        this.today.updateToday();
        var resultArray: Array<[Meal]> = [];
        for (let index = 0; index < this.mealsArray.length; index++) {
            const element = this.mealsArray[index];
            if(this.compareDateEqual(element.date,this.today)){
                resultArray.push(element.meal);
            }
        }
        return resultArray;
    }

    generateGroceriesForPeriod(dateStart: myDate, dateEnd: myDate){
        var listIngredients: Array<[Ingredient, number]> = [];
        var listMeal: Array<[Meal]> = [];
        listMeal = this.getPlannedMealsForPeriod(dateStart, dateEnd);
    
        for (var i = 0; i < listMeal.length; i++) {
            var meal: Meal = listMeal[i].meal;
            var IngredientInRecipeI: Array<[Ingredient, number]> = meal.getMealIngredients();
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

    generateGroceriesToday(): Array<[Ingredient, number]> {
        var listIngredients: Array<[Ingredient, number]> = [];
        var listMeal: Array<[Meal]> = [];
        listMeal = this.getPlannedsMealsToday();
    
        for (var i = 0; i < listMeal.length; i++) {
            var meal: Meal = listMeal[i].meal;
            var IngredientInRecipeI: Array<[Ingredient, number]> = meal.getMealIngredients();
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

    addMeal(newMeal: Meal, newDate: myDate){
        this.mealsArray.push({
            "date": newDate,
            "meal": newMeal
        });
    }

    private compareDateEqual(date1: myDate, date2: myDate){
        if(date1.getDay() == date2.getDay()){
            if(date1.getMonth() == date2.getMonth()){
                if(date1.getYear() == date2.getYear()){
                    return true;
                }
            }
        }
        return false;
    }

    private compareDateSup(date1: myDate, date2: myDate){
        if(date1.getYear() == date2.getYear()){
            if(date1.getMonth() == date2.getMonth()){
                if(date1.getDay() <= date2.getDay()){
                    return true;
                }
            }
            if (date1.getMonth() < date2.getMonth()) {
                return true;
            }
        }
        if (date1.getYear() < date2.getYear()) {
            return true;
        }
        return false;
    }

    private updateToday(){
        let dateTime = new Date();
        this.today = new myDate(dateTime.getDay(), dateTime.getMonth(), dateTime.getFullYear());
    }
}