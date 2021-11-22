/**
 * C'est morgan qui doit s'en charger
 */
interface tmpReceipe {
  name: "test";
}

/**
 * Main interface for ReceipeDatabase
 */
export class ReceipeDatabase {
  /**
   * Tableau de recettes
   */
  private receipesArray: Array<tmpReceipe>;

  constructor() {
    this.receipesArray = [];
  }

  getNumberOfReceipes(): Number {
    return this.receipesArray.length;
  }

  getReceipesByName(query: String, caseSensitive: Boolean): tmpReceipe {
    return this.receipesArray[0];
  }

  getAllReceipes(): Array<tmpReceipe> {
    return this.receipesArray;
  }
}
