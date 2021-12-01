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
import { recipeDatabase } from "../../config/classes";
import { useNavigate } from "react-router";

interface IProps {
  /**
   * Recipe object
   */
  recipe: Recipe;

  /**
   * Function called when the recipe needs to be edited
   */
  onEdit?: (recipe: Recipe) => void;

  /**
   * Function called on delete
   */
  onDelete?: () => void;
}

export default function RecipeCard({ recipe, onEdit, onDelete }: IProps) {
  const navigate = useNavigate();

  const handleEdit = () => {
    if (onEdit) {
      onEdit(recipe);
    }
  };

  const handleDelete = () => {
    recipeDatabase.deleteRecipe(recipe);
    if (onDelete) onDelete();
  };

  const handleOpen = () => {
    navigate(`/recipe/${recipe.getId()}`);
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
              <Typography variant="h5">{recipe.getName()}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">
                {recipe.getExplanation().length > 50
                  ? recipe.getExplanation().substr(0, 50) + "..."
                  : recipe.getExplanation()}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">
                {recipe.getIngredients().length} Different ingredients
              </Typography>
            </Grid>
            <Grid item container direction="row" spacing={1}>
              <Grid item>
                <Typography variant="body2" fontWeight="bold">
                  {recipe.getEaters()}
                </Typography>
              </Grid>
              <Grid item>
                <PersonIcon sx={{ lineHeight: "1.43" }} color="primary" />
              </Grid>
            </Grid>
            <Grid item container direction="row" spacing={1}>
              <Grid item>
                <Button
                  color="primary"
                  variant="outlined"
                  size="small"
                  onClick={handleOpen}
                >
                  Open recipe
                </Button>
              </Grid>
              <Grid item>
                <Button
                  color="success"
                  variant="outlined"
                  size="small"
                  onClick={handleEdit}
                >
                  Edit recipe
                </Button>
              </Grid>
              <Grid item>
                <Button
                  color="error"
                  variant="outlined"
                  size="small"
                  onClick={handleDelete}
                >
                  Delete recipe
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </CssBaseline>
    </ThemeProvider>
  );
}
