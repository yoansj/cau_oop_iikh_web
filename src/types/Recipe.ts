import generateId from "../utils/generateId";

/**
 * Represents an ingredient
 */
export enum Ingredient {
  EGG = "EGG",
  SALAD = "SALAD",
  TOMATO = "TOMATO",
  BREAD = "BREAD",
  CHICKEN = "CHICKEN",
  PORK = "PORK",
  SALMON = "SALMON",
  APRICOT = "APRICOT",
  APPLE = "APPLE",
  GRAPEFRUIT = "GRAPEFRUIT",
  MANDARIN = "MANDARIN",
  PINEAPPLE = "PINEAPPLE",
  KIWI = "KIWI",
  PEACH = "PEACH",
  ORANGE = "ORANGE",
  MANGO = "MANGO",
  FIGS = "FIGS",
  CHERRY = "CHERRY",
  GRAPES = "GRAPES",
  WATERMELON = "WATERMELON",
  PEAR = "PEAR",
  AVOCADO = "AVOCADO",
  LEMON = "LEMON",
  BANANA = "BANANA",
  CABBAGE="CABBAGE",
  LETTUCE="LETTUCE",
  ONION="ONION",
  SPINACH="SPINACH",
  POTEATO="POTATO",
  CELERY="CELERY",
  ASPARGUS="ASPARGUS",
  RADISH="RADISH",
  BROCCOLI="BROCCOLI",
  ARTICHOKE="ARTICHOKE",
  CUCUMBER="CUCUMBER",
  EGGPLANT="EGGPLANT",
  CARROT="CARROT",
  PUMPKIN="PUMPKIN",
  PEA="PEA",
  MUSHROOM="MUSHROOM",
  BEAT="BEAT",
  CORN="CORN",
  CAULIFLOWER="COLIFLOWER",
  ZUCCHINI="ZUCCHINI",
  ENDIVE="ENDIVE",
  LEEK="LEEK",
  PARSNIP="PARSNIP",
  GARLIC="GARLIC",
  CHEESE="CHEESE",
  BUTTER="BUTTER",
  YOGURT="YOGURT",
  SAUSAGE = "SAUSAGE",
  STEAK = " STEAK",
  HAM="HAM",
  BACON="BACON",
  SHRIMP="SHRIMP",
  SQUID="SQUID",
  RICE="RICE",
  NOODLE="NOODLE",
  JAM="JAM",
  MILK="MILK",
  CREAM="CREAM",
  TUNA="TUNA",
  FISH="FISH",
  MAKEREL="MAKEREL",
  COD="COD",
  SARDINES="SARDINES",
  HERRING="HERRING",
  FLOUNDER="FLONDER",
  SNAPPER="SNAPPER",
  CRAB="CRAB",
  LOBSTER="LOBSTER",
  MUSSELS="MUSSELS",
  ABALONE="ABALONE",
  CLAMS="CLAMS",
  OYSTERS="OYSTERS",
  EEL="EEL",
  OCTOPUS="OCTOPUS",
  DUCK="DUCK",
  LAMB="LAMB",
  BEEF="BEEF",
  ALMOND="ALMOND",
  PEANUT="PEANUT",
  WALNUT="WALNUT",
  BEANS="BEANS",
  QUINOA="QUINOA",
  OATS="OATS",
  COCONUT="COCONUT",
  SEEDS="SEEDS",
  PASTA="PASTA",
  CHOCOLATE="CHOCOLATE",
  WINE="WINE",
  OIL="OIL",
  VINEGAR="VINEGAR",
}

/**
 * Recipe class
 */
export default class Recipe {
  /**
   * Name of the recipe
   */
  private name: string;

  /**
   * Ingredients of the recipe, quantity is in gram
   */
  private ingredients: Array<[Ingredient, number]>;

  /**
   * Number of people supposed to eat the recipe
   */
  private eaters: number;

  /**
   * Explanation on how to make the recipe
   */
  private explanation: string;

  /**
   * (UUID) id of the recipe
   */
  private id: string;

  /**
   * Constructor for a recipe
   * @param name - Name of the recipe
   * @param ingredients - Ingredients needed for the recipe
   * @param eaters - Number of people expected to eat the recipe
   * @param explanation - How to make the recipe
   * @param id - Optionnal, in most case id is auto generated, id won't be auto generated if its an upsaled recipe
   */
  constructor(
    name: string,
    ingredients: Array<[Ingredient, number]>,
    eaters: number,
    explanation: string,
    id?: string
  ) {
    this.name = name;
    this.ingredients = ingredients;
    this.eaters = eaters;
    if (id === undefined) this.id = generateId();
    else this.id = id;
    this.explanation = explanation;
  }

  private toObject() {
    return {
      name: this.name,
      ingredients: this.ingredients,
      eaters: this.eaters,
      explanation: this.explanation,
      id: this.id,
    };
  }

  serialize() {
    return JSON.stringify(this.toObject());
  }

  static deserialize(serialized: any) {
    return new Recipe(
      serialized.name,
      serialized.ingredients,
      serialized.eaters,
      serialized.explanation,
      serialized.id
    );
  }

  getIngredients(): Array<[Ingredient, number]> {
    return this.ingredients;
  }

  getName(): string {
    return this.name;
  }

  getEaters(): number {
    return this.eaters;
  }

  getExplanation(): string {
    return this.explanation;
  }

  getId(): string {
    return this.id;
  }

  setIngredients(newIngredients: Array<[Ingredient, number]>) {
    this.ingredients = newIngredients;
  }

  setName(newName: string) {
    this.name = newName;
  }

  setEaters(newEaters: number) {
    this.eaters = newEaters;
  }

  setExplanation(newEplenation: string) {
    this.explanation = newEplenation;
  }

  upScaleRecipe(newEaters: number): Recipe {
    let factor = newEaters / this.eaters;
    let newlist: Array<[Ingredient, number]> = [];
    for (var i = 0; i < this.ingredients.length; i++) {
      newlist.push([this.ingredients[i][0], this.ingredients[i][1] * factor]);
    }
    return new Recipe(this.name, newlist, newEaters, this.explanation, this.id);
  }
}
