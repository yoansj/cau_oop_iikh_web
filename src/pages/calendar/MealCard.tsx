import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import theme from "../../config/theme";

import Recipe from "../../types/Recipe";
import { planner, recipeDatabase } from "../../config/classes";
import { useNavigate } from "react-router";
import { Meal } from "../../types/Meal";

interface IProps {
  /**
   * Recipe object
   */
  meal: Meal;

  /**
   * Function called when the recipe needs to be edited
   */
  onOpen?: (meal: Meal) => void;

  /**
   * Function called on delete
   */
  onDelete?: () => void;
}

export default function MealCard({ meal, onOpen, onDelete }: IProps) {
  const handleOpen = () => {
    if (onOpen) {
      onOpen(meal);
    }
  };

  const handleDelete = () => {
    planner.deleteMeal(meal);
    if (onDelete) onDelete();
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Paper sx={{ width: "80%", margin: "10px" }}>
          <Grid
            container
            direction="column"
            spacing={2}
            sx={{
              marginLeft: "5px",
              paddingTop: "5px",
              paddingBottom: "10px",
            }}
          >
            <Grid item>
              <Typography variant="h5">{meal.getMealName()}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">
                A meal made for {meal.getmealEaters()} persons
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" color="blue">
                A meal scheduled for {meal.getMealDate().toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item container direction="row" spacing={1}>
              <Grid item>
                <Button
                  color="primary"
                  variant="outlined"
                  size="small"
                  onClick={handleOpen}
                >
                  Inspect meal
                </Button>
              </Grid>
              <Grid item>
                <Button
                  color="error"
                  variant="outlined"
                  size="small"
                  onClick={handleDelete}
                >
                  Delete meal
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </CssBaseline>
    </ThemeProvider>
  );
}
