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
        // var auxingredients : Array<Ingredient>=[];
        // for(var i = 0; i < this.mealReceipe.length; i++){ 

        //     var aux : Array<[Ingredient,number]>= this.mealReceipe[i].getIngredients();
        //     for(var j=0;j<aux.length;j++){
        //         var index : number = auxingredients.indexOf(aux[j][0])
        //         if(index ==-1){
        //             //we need to add this new ingredients to the liste
        //             auxingredients.push(aux[j][0]);
        //             listIngredients.push(aux[j]);
        //         } else {
                    
        //             //the ingredients is already in the list we just need to add the quantity
        //         }
        //     }
        //     //newlist.push([this.ingredients[i][0],this.ingredients[i][1]*factor]);
        // }
        return listIngredients;
    }
}
