import Receipe from "./Receipe";
import { Ingredient } from "./Receipe";

export class Meal {

    private mealEaters : number;
    private mealReceipe : Array<Receipe>;

    // constructor(eaters:number,listReceipe:Array<Receipe>){
    //     this.mealEaters=eaters;
    //     this.mealReceipe=listReceipe;
    // }
    constructor(eaters:number){
        this.mealEaters=eaters;
        this.mealReceipe=[];
    }

    addReceipe(newReceipe:Receipe) {
        //Automacally scale the receipe to match with the number of eater for this meal
        let ReceipeAux : Receipe = newReceipe.upScaleReceipe(this.mealEaters);
        this.mealReceipe.push(ReceipeAux);
    }

    getmealEaters(): number{
        return this.mealEaters;
    }

    setEaters(newEaters:number){
        this.mealEaters=newEaters;
    }

    getmealReceipe(): Array<Receipe>{
        return this.mealReceipe;
    }

    setmealReceipe(newListReceipe : Array<Receipe>){
        this.mealReceipe=newListReceipe;
    }

    getMealIngredients() : Array<[Ingredient,number]>{
        var listIngredients : Array<[Ingredient,number]>=[];

        for (var i = 0; i<this.mealReceipe.length;i++){
            var IngredientinReceipeI : Array<[Ingredient,number]>= this.mealReceipe[i].getIngredients();
            for (var j=0;j<IngredientinReceipeI.length;j++) {
                var stop : number = 0;
                for(var k=0;k<listIngredients.length&&stop!=1;k++){
                    if(listIngredients[k][0]==IngredientinReceipeI[j][0]){
                        //already in the list need to add the quantity
                        listIngredients[k][1]+=IngredientinReceipeI[j][1];
                        stop=1;
                    }
                }
                //we didnt find the ingredient in listIngredients so we need to add it
                listIngredients.push(IngredientinReceipeI[j]);
            }
        }
        return listIngredients;
    }
}
