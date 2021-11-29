import { Receipe } from "./Receipe";

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

;


    //   /**
    //    * @brief  Returns the ingredients for the meal
    //    */
    //   Ingredients getMealIngredients() const;
}