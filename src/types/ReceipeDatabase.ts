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

  getNumberOfReceipes(): Number {
    return this.receipesArray.length;
  }

  /**
   * Returns receipes by name, this function is case insensitive
   * @param query - Search query by the user
   * @returns Found receipes
   */
  getReceipesByName(query: String): Array<Receipe> {
    return this.receipesArray.filter(
      (receipe) => receipe.getName().toLowerCase() === query
    );
  }

  getAllReceipes(): Array<Receipe> {
    return this.receipesArray;
  }
}
