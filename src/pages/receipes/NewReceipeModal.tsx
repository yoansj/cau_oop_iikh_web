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
import React, { useState } from "react";

import { receipeDatabase } from "../../config/classes";
import Receipe, { Ingredient } from "../../types/Receipe";

interface IProps {
  /**
   * If the modal is opened
   */
  open: boolean;

  /**
   * Called when the modal is closed
   */
  onClose: () => void;
}

export default function NewReceipeModal({ open, onClose }: IProps) {
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

  const handleAddReceipe = () => {
    if (
      title.trim() === "" ||
      explaination.trim() === "" ||
      eaters < 1 ||
      ingredients.length < 1
    ) {
      setError(true);
      setTimeout(() => setError(false), 15000);
    } else {
      const receipe = new Receipe(
        title.trim(),
        ingredients,
        eaters,
        explaination.trim()
      );
      receipeDatabase.addReceipe(receipe);
      handleCloseModal();
    }
  };

  return (
    <CssBaseline>
      <Dialog open={open} onClose={handleCloseModal} maxWidth="md" fullWidth>
        <DialogTitle>Add a new receipe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a receipe please enter all the different fields below
          </DialogContentText>
          <TextField
            label="Title of your receipe"
            placeholder="Enter a non empty title"
            variant="outlined"
            color="primary"
            onChange={handleTitleChange}
            value={title}
            fullWidth
            sx={{ marginTop: "15px" }}
          />
          <TextField
            label="Explaination of your receipe"
            placeholder="Describe the steps of your receipe"
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
            label="Number of people that will eat your receipe"
            variant="outlined"
            color="primary"
            onChange={handleEatersChange}
            value={eaters}
            fullWidth
            type="number"
            sx={{ marginTop: "15px" }}
          />
          <DialogContentText sx={{ marginTop: "15px" }}>
            Define the different ingredients of your receipe
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
              You have no ingredients for that receipe, please add at least 1
              ingredient
            </DialogContentText>
          ) : (
            <DialogContentText sx={{ marginTop: "15px" }}>
              Ingredients for that receipe
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
            Once you finalized your receipe you can add it using the button
            below
          </DialogContentText>
          {error ? (
            <DialogContentText sx={{ color: "red", marginBottom: "15px" }}>
              Your receipe is not valid one of the requirements wasn't met:{" "}
              <br />
              • Have a title <br />
              • Have an explanation <br />
              • The number of people that will eat the receipe should be greater
              than zero <br />• Have at least 1 ingredient
            </DialogContentText>
          ) : (
            []
          )}
          <Button
            color="primary"
            variant="contained"
            onClick={handleAddReceipe}
          >
            Add receipe
          </Button>
        </DialogContent>
      </Dialog>
    </CssBaseline>
  );
}
