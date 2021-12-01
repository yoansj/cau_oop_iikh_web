import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Fade from "@mui/material/Fade";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import React, { useMemo, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../config/theme";

import { recipeDatabase } from "../../config/classes";
import RecipeModal from "./RecipeModal";
import RecipeCard from "./RecipeCard";
import Recipe from "../../types/Recipe";

/**
 * This page is used to look for recipes
 */
export default function Recipes() {
  /* General states */
  const [search, setSearch] = useState("");
  const [refresh, setRefresh] = useState(false);
  const filteredRecipes = useMemo(() => {
    if (search === "") {
      return recipeDatabase.getAllRecipes();
    } else {
      return recipeDatabase.getRecipesByName(search);
    }
    // eslint-disable-next-line
  }, [search, refresh]);

  /* Modal states */
  const [open, setOpen] = useState(false);
  const [editedRecipe, setEdiRecipe] = useState<Recipe>();

  /* Handlers */

  // Input handlers
  const handleSearchChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => setSearch(event.target.value);

  // Modal handlers
  const handleCloseModal = () => {
    setOpen(false);
    if (editedRecipe !== undefined) setEdiRecipe(undefined);
  };
  const handleOpenModal = () => setOpen(true);

  const handleEditRecipe = (recipe: Recipe) => {
    setEdiRecipe(recipe);
    handleOpenModal();
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Container maxWidth="xl">
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={3}
          >
            <Grid item>
              <Fade in timeout={800}>
                <Typography variant="h2" textAlign="center">
                  Recipes
                </Typography>
              </Fade>
            </Grid>
            <Grid
              item
              container
              direction="row"
              justifyContent="center"
              spacing={2}
            >
              <Grid item xs={6}>
                <Fade in timeout={1000}>
                  <TextField
                    label="Search a recipe by name"
                    placeholder="Non case sensitive enter what you would like to see"
                    variant="outlined"
                    color="primary"
                    sx={{ width: "100%" }}
                    onChange={handleSearchChange}
                    value={search}
                    focused
                  />
                </Fade>
              </Grid>
              <Grid item xs={2}>
                <Fade in timeout={1200}>
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{ width: "100%", height: "100%" }}
                    onClick={handleOpenModal}
                  >
                    New recipe
                  </Button>
                </Fade>
              </Grid>
            </Grid>
            <Grid item sx={{ width: "67%", height: "70vh" }}>
              <Fade in timeout={1400}>
                <Paper
                  sx={{ height: "100%", overflowY: "scroll" }}
                  elevation={8}
                >
                  <Grid
                    container
                    direction="column"
                    alignItems="center"
                    sx={{ paddingTop: "20px" }}
                  >
                    {filteredRecipes.map((recipe) => (
                      <RecipeCard
                        recipe={recipe}
                        onEdit={handleEditRecipe}
                        onDelete={() => setRefresh((r) => !r)}
                        key={recipe.getId()}
                      />
                    ))}
                  </Grid>
                  {search !== "" ? (
                    <Typography
                      variant="body1"
                      textAlign="center"
                      color="#1e88e5"
                    >
                      {filteredRecipes.length} recipes found
                    </Typography>
                  ) : (
                    <Typography
                      variant="body1"
                      textAlign="center"
                      color="#1e88e5"
                    >
                      {filteredRecipes.length} recipe
                      {filteredRecipes.length > 1 ? "s" : ""} in the database
                    </Typography>
                  )}
                </Paper>
              </Fade>
            </Grid>
          </Grid>
        </Container>
        <RecipeModal
          open={open}
          onClose={handleCloseModal}
          editingRecipe={editedRecipe}
        />
      </CssBaseline>
    </ThemeProvider>
  );
}
