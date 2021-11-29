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
}

/**
 * Receipe class
 */
export default class Receipe {
  /**
   * Name of the receipe
   */
  private name: string;

  /**
   * Ingredients of the receipe, quantity is in gram
   */
  private ingredients: Array<[Ingredient, number]>;

  /**
   * Number of people supposed to eat the receipe
   */
  private eaters: number;

  /**
   * Explanation on how to make the receipe
   */
  private explanation: string;

  /**
   * (UUID) id of the receipe
   */
  private id: string;

  /**
   * Constructor for a receipe
   * @param name - Name of the receipe
   * @param ingredients - Ingredients needed for the receipe
   * @param eaters - Number of people expected to eat the receipe
   * @param explanation - How to make the receipe
   * @param id - Optionnal, in most case id is auto generated, id won't be auto generated if its an upsaled receipe
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
    return new Receipe(
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

  upScaleReceipe(newEaters: number): Receipe {
    let factor = newEaters / this.eaters;
    let newlist: Array<[Ingredient, number]> = [];
    for (var i = 0; i < this.ingredients.length; i++) {
      newlist.push([this.ingredients[i][0], this.ingredients[i][1] * factor]);
    }
    return new Receipe(
      this.name,
      newlist,
      newEaters,
      this.id,
      this.explanation
    );
  }
}
