import databaseKey from "../config/database";
import Receipe from "./Receipe";

/**
 * Main interface for ReceipeDatabase
 */
export class ReceipeDatabase {
  /**
   * Tableau de recettes
   */
  private receipesArray: Array<Receipe>;

  /**
   * Constructor fetches receipe from localstorage of the user
   */
  constructor() {
    const receipes = localStorage.getItem(databaseKey);

    if (receipes == null) {
      this.receipesArray = [];
    } else {
      this.receipesArray = JSON.parse(receipes).map((receipe: any) =>
        Receipe.deserialize(receipe)
      );
    }
  }

  /**
   * Refreshes the receipe list on the database
   */
  refreshReceipes() {
    const receipes = localStorage.getItem(databaseKey);

    if (receipes == null) {
      this.receipesArray = [];
    } else {
      this.receipesArray = JSON.parse(receipes).map((receipe: any) =>
        Receipe.deserialize(receipe)
      );
    }
  }

  /**
   * Standard function to add a receipe to the database
   * @param receipe - Receipe to be added
   */
  addReceipe(receipe: Receipe) {
    this.receipesArray.push(receipe);
    localStorage.setItem(databaseKey, JSON.stringify(this.receipesArray));
    this.refreshReceipes();
  }

  /**
   * Edits a receipe by receiving a receipe object
   * The receipe object must have the same id as the receipe tha needs to be edited
   * @param receipe - Receipe edited
   */
  editReceipe(receipe: Receipe): boolean {
    const index = this.receipesArray.findIndex((r) => {
      return r.getId() === receipe.getId();
    });

    if (index === -1) {
      return false;
    } else {
      this.receipesArray[index].setName(receipe.getName());
      this.receipesArray[index].setEaters(receipe.getEaters());
      this.receipesArray[index].setExplanation(receipe.getExplanation());
      this.receipesArray[index].setIngredients(receipe.getIngredients());
      localStorage.setItem(databaseKey, JSON.stringify(this.receipesArray));
      this.refreshReceipes();
      return true;
    }
  }

  /**
   * Deletes a receipe from the database
   * @param receipe - Requires the original receipe
   */
  deleteReceipe(receipe: Receipe): boolean {
    const index = this.receipesArray.findIndex((r) => {
      return r.getId() === receipe.getId();
    });

    if (index === -1) {
      return false;
    } else {
      this.receipesArray.splice(index, 1);
      localStorage.setItem(databaseKey, JSON.stringify(this.receipesArray));
      this.refreshReceipes();
      return true;
    }
  }

  getNumberOfReceipes(): Number {
    return this.receipesArray.length;
  }

  /**
   * Returns receipes by name, this function is case insensitive
   * @param query - Search query by the user
   * @returns Found receipes
   */
  getReceipesByName(query: string): Array<Receipe> {
    return this.receipesArray.filter((receipe) =>
      receipe.getName().toLowerCase().includes(query)
    );
  }

  /**
   * Returns a receipe by id, if not found returns undefined
   * @param id - Id of the receipe to return
   * @returns Found receipe or undefined
   */
  getReceipeById(id: string): Receipe | undefined {
    const index = this.receipesArray.findIndex((r) => {
      return r.getId() === id;
    });

    if (index === -1) {
      return undefined;
    } else {
      return this.receipesArray[index];
    }
  }

  getAllReceipes(): Array<Receipe> {
    return this.receipesArray;
  }
}
