import databaseKey from "../config/database";
import Recipe from "./Recipe";

/**
 * Main interface for RecipeDatabase
 */
export class RecipeDatabase {
  /**
   * Tableau de recettes
   */
  private recipesArray: Array<Recipe>;

  /**
   * Constructor fetches recipe from localstorage of the user
   */
  constructor() {
    const recipes = localStorage.getItem(databaseKey);

    if (recipes == null) {
      this.recipesArray = [];
    } else {
      this.recipesArray = JSON.parse(recipes).map((recipe: any) =>
        Recipe.deserialize(recipe)
      );
    }
  }

  /**
   * Refreshes the recipe list on the database
   */
  refreshRecipes() {
    const recipes = localStorage.getItem(databaseKey);

    if (recipes == null) {
      this.recipesArray = [];
    } else {
      this.recipesArray = JSON.parse(recipes).map((recipe: any) =>
        Recipe.deserialize(recipe)
      );
    }
  }

  /**
   * Standard function to add a recipe to the database
   * @param recipe - Recipe to be added
   */
  addRecipe(recipe: Recipe) {
    this.recipesArray.push(recipe);
    localStorage.setItem(databaseKey, JSON.stringify(this.recipesArray));
    this.refreshRecipes();
  }

  /**
   * Edits a recipe by receiving a recipe object
   * The recipe object must have the same id as the recipe tha needs to be edited
   * @param recipe - Recipe edited
   */
  editRecipe(recipe: Recipe): boolean {
    const index = this.recipesArray.findIndex((r) => {
      return r.getId() === recipe.getId();
    });

    if (index === -1) {
      return false;
    } else {
      this.recipesArray[index].setName(recipe.getName());
      this.recipesArray[index].setEaters(recipe.getEaters());
      this.recipesArray[index].setExplanation(recipe.getExplanation());
      this.recipesArray[index].setIngredients(recipe.getIngredients());
      localStorage.setItem(databaseKey, JSON.stringify(this.recipesArray));
      this.refreshRecipes();
      return true;
    }
  }

  /**
   * Deletes a recipe from the database
   * @param recipe - Requires the original recipe
   */
  deleteRecipe(recipe: Recipe): boolean {
    const index = this.recipesArray.findIndex((r) => {
      return r.getId() === recipe.getId();
    });

    if (index === -1) {
      return false;
    } else {
      this.recipesArray.splice(index, 1);
      localStorage.setItem(databaseKey, JSON.stringify(this.recipesArray));
      this.refreshRecipes();
      return true;
    }
  }

  getNumberOfRecipes(): Number {
    return this.recipesArray.length;
  }

  /**
   * Returns recipes by name, this function is case insensitive
   * @param query - Search query by the user
   * @returns Found recipes
   */
  getRecipesByName(query: string): Array<Recipe> {
    return this.recipesArray.filter((recipe) =>
      recipe.getName().toLowerCase().includes(query)
    );
  }

  /**
   * Returns a recipe by id, if not found returns undefined
   * @param id - Id of the recipe to return
   * @returns Found recipe or undefined
   */
  getRecipeById(id: string): Recipe | undefined {
    const index = this.recipesArray.findIndex((r) => {
      return r.getId() === id;
    });

    if (index === -1) {
      return undefined;
    } else {
      return this.recipesArray[index];
    }
  }

  getAllRecipes(): Array<Recipe> {
    return this.recipesArray;
  }
}
