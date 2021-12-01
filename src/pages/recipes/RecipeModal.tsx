import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useState, useEffect } from "react";

import { recipeDatabase } from "../../config/classes";
import Recipe, { Ingredient } from "../../types/Recipe";

interface IProps {
  /**
   * If the modal is opened
   */
  open: boolean;

  /**
   * Called when the modal is closed
   */
  onClose: () => void;

  /**
   * If this is given, the modal will go on edit mode
   */
  editingRecipe?: Recipe;
}

export default function RecipeModal({ open, onClose, editingRecipe }: IProps) {
  /* Modal states */
  const [title, setTitle] = useState("");
  const [explaination, setExplaination] = useState("");
  const [eaters, setEaters] = useState(1);
  const [ingredientToAdd, setIngredientToAdd] = useState("EGG");
  const [nbToAdd, setNbToAdd] = useState(1);
  const [ingredients, setIngredients] = useState<Array<[Ingredient, number]>>(
    []
  );
  const [error, setError] = useState(false);

  useEffect(() => {
    if (editingRecipe !== undefined) {
      setTitle(editingRecipe.getName());
      setExplaination(editingRecipe.getExplanation());
      setEaters(editingRecipe.getEaters());
      setIngredients(editingRecipe.getIngredients());
    }
  }, [editingRecipe]);

  /* Handlers */

  // Input handlers
  const handleTitleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => setTitle(event.target.value);
  const handleExplainationChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => setExplaination(event.target.value);
  const handleEatersChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => setEaters(Number(event.target.value));
  const handleNbToAddChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => setNbToAdd(Number(event.target.value));
  const handleIngredientToAddChange = (event: SelectChangeEvent) =>
    setIngredientToAdd(event.target.value as string);

  // Modal handlers
  const handleCloseModal = () => {
    onClose();
    setTitle("");
    setExplaination("");
    setEaters(1);
    setIngredientToAdd("EGG");
    setNbToAdd(1);
    setIngredients([]);
  };

  const handleAddIngredient = () => {
    if (nbToAdd >= 1) {
      ingredients.push([ingredientToAdd as Ingredient, nbToAdd]);
      setNbToAdd(1);
      setIngredientToAdd("EGG");
    }
  };

  const handleDeleteIngredient = (index: number) => {
    let newArr = [...ingredients];
    newArr.splice(index, 1);
    setIngredients(newArr);
  };

  const handleAddRecipe = () => {
    if (
      title.trim() === "" ||
      explaination.trim() === "" ||
      eaters < 1 ||
      ingredients.length < 1
    ) {
      setError(true);
      setTimeout(() => setError(false), 15000);
    } else {
      if (editingRecipe === undefined) {
        const recipe = new Recipe(
          title.trim(),
          ingredients,
          eaters,
          explaination.trim()
        );
        recipeDatabase.addRecipe(recipe);
      } else {
        const recipe = new Recipe(
          title.trim(),
          ingredients,
          eaters,
          explaination.trim(),
          editingRecipe.getId()
        );
        recipeDatabase.editRecipe(recipe);
      }
      handleCloseModal();
    }
  };

  return (
    <CssBaseline>
      <Dialog open={open} onClose={handleCloseModal} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingRecipe === undefined
            ? "Add a new recipe"
            : "Modify existing recipe"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            To {editingRecipe === undefined ? "add" : "modify"} a recipe please
            fill all the different fields below
          </DialogContentText>
          <TextField
            label="Title of your recipe"
            placeholder="Enter a non empty title"
            variant="outlined"
            color="primary"
            onChange={handleTitleChange}
            value={title}
            fullWidth
            sx={{ marginTop: "15px" }}
          />
          <TextField
            label="Explaination of your recipe"
            placeholder="Describe the steps of your recipe"
            variant="outlined"
            color="primary"
            onChange={handleExplainationChange}
            value={explaination}
            fullWidth
            multiline
            minRows={5}
            sx={{ marginTop: "15px" }}
          />
          <TextField
            label="Number of people that will eat your recipe"
            variant="outlined"
            color="primary"
            onChange={handleEatersChange}
            value={eaters}
            fullWidth
            type="number"
            sx={{ marginTop: "15px" }}
          />
          <DialogContentText sx={{ marginTop: "15px" }}>
            Define the different ingredients of your recipe
          </DialogContentText>
          <Grid container direction="row" alignItems="center">
            <TextField
              label={"Number of " + ingredientToAdd + " to add"}
              variant="outlined"
              color="primary"
              onChange={handleNbToAddChange}
              type="number"
              value={nbToAdd}
              sx={{ marginTop: "15px" }}
            />
            <Select
              value={ingredientToAdd}
              onChange={handleIngredientToAddChange}
              sx={{
                marginTop: "15px",
                marginRight: "10px",
                marginLeft: "10px",
              }}
            >
              {Object.keys(Ingredient).map((ingredient) => (
                <MenuItem value={ingredient}>{ingredient}</MenuItem>
              ))}
            </Select>
            <Button
              color="primary"
              variant="contained"
              size="large"
              sx={{ marginTop: "15px" }}
              onClick={handleAddIngredient}
            >
              Add {nbToAdd} {ingredientToAdd}
            </Button>
          </Grid>
          {ingredients.length === 0 ? (
            <DialogContentText sx={{ marginTop: "15px" }}>
              You have no ingredients for that recipe, please add at least 1
              ingredient
            </DialogContentText>
          ) : (
            <DialogContentText sx={{ marginTop: "15px" }}>
              Ingredients for that recipe
            </DialogContentText>
          )}
          <Grid container direction="column">
            {ingredients.map((ingredient, index) => (
              <Grid
                item
                container
                direction="row"
                spacing={2}
                sx={{ margin: "0.25px" }}
                key={index}
              >
                <Grid item>
                  • {ingredient[1]} {ingredient[0]}
                </Grid>
                <Grid item>
                  <Button
                    color="error"
                    variant="contained"
                    onClick={() => handleDeleteIngredient(index)}
                  >
                    Delete ingredient
                  </Button>
                </Grid>
              </Grid>
            ))}
          </Grid>
          <DialogContentText sx={{ marginTop: "30px", marginBottom: "15px" }}>
            Once you finalized your recipe you can add it using the button below
          </DialogContentText>
          {error ? (
            <DialogContentText sx={{ color: "red", marginBottom: "15px" }}>
              Your recipe is not valid one of the requirements wasn't met:{" "}
              <br />
              • Have a title <br />
              • Have an explanation <br />
              • The number of people that will eat the recipe should be greater
              than zero <br />• Have at least 1 ingredient
            </DialogContentText>
          ) : (
            []
          )}
          <Button color="primary" variant="contained" onClick={handleAddRecipe}>
            {editingRecipe === undefined ? "add" : "modify"} recipe
          </Button>
        </DialogContent>
      </Dialog>
    </CssBaseline>
  );
}
