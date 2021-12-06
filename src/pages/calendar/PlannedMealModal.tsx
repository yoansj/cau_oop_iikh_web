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
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import StaticDatePicker from "@mui/lab/StaticDatePicker";
import React, { useState, useEffect } from "react";

import { planner, recipeDatabase } from "../../config/classes";
import Recipe, { Ingredient } from "../../types/Recipe";
import { Meal } from "../../types/Meal";
import { MyDate } from "../../types/MyDate";

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 350,
    },
  },
};

export default function PlannedMealModal({ open, onClose }: IProps) {
  /* Modal states */
  const [title, setTitle] = useState("");
  const [eaters, setEaters] = useState(1);
  const [recipeToAdd, setRecipeToAdd] = useState("");
  const [recipes, setRecipes] = useState<Array<string>>([]);
  const [date, setDate] = React.useState<Date | null>(new Date());
  const [error, setError] = useState(false);

  /* Handlers */

  // Input handlers
  const handleTitleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => setTitle(event.target.value);
  const handleEatersChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => setEaters(Number(event.target.value));
  const handlerecipeToAddChange = (event: SelectChangeEvent) =>
    setRecipeToAdd(event.target.value as string);

  // Modal handlers
  const handleCloseModal = () => {
    onClose();
    setTitle("");
    setEaters(1);
    setRecipeToAdd("");
    setRecipes([]);
    setDate(new Date());
  };

  const handleAddrecipe = () => {
    if (recipeToAdd !== "") {
      recipes.push(recipeToAdd);
      setRecipeToAdd("");
    }
  };

  const handleDeleterecipe = (index: number) => {
    let newArr = [...recipes];
    newArr.splice(index, 1);
    setRecipes(newArr);
  };

  const handleCreateMeal = () => {
    if (
      title.trim() === "" ||
      eaters < 1 ||
      recipes.length < 1 ||
      date === null
    ) {
      setError(true);
      setTimeout(() => setError(false), 15000);
    } else {
      const recipeArray = recipes.map((r) => {
        const rObject = JSON.parse(r);
        return Recipe.deserialize(rObject);
      });

      const newMeal = new Meal(eaters);
      newMeal.setMealName(title);
      newMeal.addRecipes(recipeArray);
      newMeal.setMealDate(date);
      planner.addMeal(newMeal);
      handleCloseModal();
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <CssBaseline>
        <Dialog open={open} onClose={handleCloseModal} maxWidth="md" fullWidth>
          <DialogTitle>Plan a meal</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To add a meal fill all the contents below
            </DialogContentText>
            <TextField
              label="Title of your meal"
              placeholder="Enter a non empty title"
              variant="outlined"
              color="primary"
              onChange={handleTitleChange}
              value={title}
              fullWidth
              sx={{ marginTop: "15px" }}
            />
            <TextField
              label="Number of people that will eat your meal"
              variant="outlined"
              color="primary"
              onChange={handleEatersChange}
              value={eaters}
              fullWidth
              type="number"
              sx={{ marginTop: "15px" }}
            />
            <DialogContentText sx={{ marginTop: "15px" }}>
              Set the date of the meal
            </DialogContentText>
            <StaticDatePicker
              displayStaticWrapperAs="desktop"
              value={date}
              onChange={(newValue) => {
                setDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            <DialogContentText sx={{ marginTop: "15px" }}>
              Define the different recipes of your meal
            </DialogContentText>
            <Grid container direction="row" alignItems="center">
              <Select
                value={recipeToAdd}
                onChange={handlerecipeToAddChange}
                MenuProps={MenuProps}
                sx={{
                  marginTop: "15px",
                  marginRight: "10px",
                  marginLeft: "10px",
                  minWidth: "230px",
                }}
              >
                {recipeDatabase
                  .getAllRecipes()
                  .sort((a, b) => a.getName().localeCompare(b.getName()))
                  .map((r) => (
                    <MenuItem value={r.serialize()}>{r.getName()}</MenuItem>
                  ))}
              </Select>
              <Button
                color="primary"
                variant="contained"
                size="large"
                sx={{ marginTop: "15px" }}
                onClick={handleAddrecipe}
              >
                Add selected recipe
              </Button>
            </Grid>
            {recipes.length === 0 ? (
              <DialogContentText sx={{ marginTop: "15px" }}>
                You have no recipes for that meal, please add at least one
              </DialogContentText>
            ) : (
              <DialogContentText sx={{ marginTop: "15px" }}>
                recipes for that meal
              </DialogContentText>
            )}
            <Grid container direction="column">
              {recipes.map((recipe, index) => {
                const recipeObj = JSON.parse(recipe);

                return (
                  <Grid
                    item
                    container
                    direction="row"
                    spacing={2}
                    sx={{
                      margin: "0.25px",
                      border: "solid",
                      padding: "1px",
                    }}
                    key={index}
                  >
                    <Grid item>
                      • {recipeObj.name} <br /> Explanation:{" "}
                      {recipeObj.explanation.substr(0, 50)}
                      {"..."}
                      <br />
                    </Grid>
                    <Grid item>
                      <Button
                        color="error"
                        variant="contained"
                        onClick={() => handleDeleterecipe(index)}
                      >
                        Delete recipe
                      </Button>
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
            <DialogContentText sx={{ marginTop: "30px", marginBottom: "15px" }}>
              Once you finalized your meal you can add it using the button below
            </DialogContentText>
            {error ? (
              <DialogContentText sx={{ color: "red", marginBottom: "15px" }}>
                Your meal is not valid one of the requirements wasn't met:{" "}
                <br />
                • Have a name <br />
                • The number of people that will eat the meal should be greater
                than zero <br />• Have at least 1 recipe <br />• Have a date
              </DialogContentText>
            ) : (
              []
            )}
            <Button
              color="primary"
              variant="contained"
              onClick={handleCreateMeal}
            >
              Add meal
            </Button>
          </DialogContent>
        </Dialog>
      </CssBaseline>
    </LocalizationProvider>
  );
}
