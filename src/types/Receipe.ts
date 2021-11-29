enum Ingredient {
    EGG="EGG",
    SALAD="SALAD",
    TOMATO="TOMATO",
    BREAD="BREAD",
    CHICKEN="CHICKEN",
    PORK="PORK",
    SALMON="SALMON",
    APRICOT="APRICOT",
    APPLE="APPLE",
    GRAPEFRUIT="GRAPEFRUIT",
    MANDARIN="MANDARIN",
    PINEAPPLE="PINEAPPLE",
    KIWI="KIWI",
    PEACH="PEACH",
    ORANGE="ORANGE",
    MANGO="MANGO",
    FIGS="FIGS",
    CHERRY="CHERRY",
    GRAPES="GRAPES",
    WATERMELON="WATERMELON",
    PEAR="PEAR",
    AVOCADO="AVOCADO",
    LEMON="LEMON",
    BANANA="BANANA",
}


class Receipe {
    private name : string;
    //number in grames for the quantity
    private ingredients:Array<[Ingredient,number]>;
    private eaters:number;
    private id:number;
    private explenation:string;
    
    constructor(name:string,ingredients:Array<[Ingredient,number]>,eaters:number,id:number,explanation:string){
        this.name=name;
        this.ingredients=ingredients;
        this.eaters=eaters;
        this.id=id;
        this.explenation=explanation;
    }
    //Faire un destructeur ?

    getIngredients(): Array<[Ingredient,number]>{
        return this.ingredients;
    }

    getName():string{
        return this.name;
    };

    getEaters(): number{
        return this.eaters;
    }

    getExplanation():string{
        return this.explenation;
    }

    getId():number{
        return this.id;
    }

    setIngredients(newIngredients:Array<[Ingredient,number]>){
        this.ingredients=newIngredients;
    }

    setName(newName:string){
        this.name=newName;
    }

    setEaters(newEaters:number){
        this.eaters=newEaters;
    }

    setExplanation(newEplenation:string){
        this.explenation=newEplenation;
    }

    upScaleReceipe(newEaters:number):Receipe{
        let factor = newEaters/this.eaters;
        let newlist: Array<[Ingredient,number]>;
        for(var i = 0; i < this.ingredients.length; i++){ 
            newlist.push([this.ingredients[i][0],this.ingredients[i][1]*factor]);
        }
        return new Receipe (this.name,newlist,newEaters,this.id,this.explenation);
    }
}