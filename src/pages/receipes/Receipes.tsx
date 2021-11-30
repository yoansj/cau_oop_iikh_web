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

import { receipeDatabase } from "../../config/classes";
import ReceipeModal from "./ReceipeModal";
import ReceipeCard from "./ReceipeCard";
import Receipe from "../../types/Receipe";

export default function Receipes() {
  /* General states */
  const [search, setSearch] = useState("");
  const [refresh, setRefresh] = useState(false);
  const filteredReceipes = useMemo(() => {
    if (search === "") {
      return receipeDatabase.getAllReceipes();
    } else {
      return receipeDatabase.getReceipesByName(search);
    }
  }, [search, refresh]);

  /* Modal states */
  const [open, setOpen] = useState(false);
  const [editedReceipe, setEdiReceipe] = useState<Receipe>();

  /* Handlers */

  // Input handlers
  const handleSearchChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => setSearch(event.target.value);

  // Modal handlers
  const handleCloseModal = () => {
    setOpen(false);
    if (editedReceipe !== undefined) setEdiReceipe(undefined);
  };
  const handleOpenModal = () => setOpen(true);

  const handleEditReceipe = (receipe: Receipe) => {
    setEdiReceipe(receipe);
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
                  Receipes
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
                    label="Search a receipe by name"
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
                    New receipe
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
                    {filteredReceipes.map((receipe) => (
                      <ReceipeCard
                        receipe={receipe}
                        onEdit={handleEditReceipe}
                        onDelete={() => setRefresh((r) => !r)}
                        key={receipe.getId()}
                      />
                    ))}
                  </Grid>
                  {search !== "" ? (
                    <Typography
                      variant="body1"
                      textAlign="center"
                      color="#1e88e5"
                    >
                      {filteredReceipes.length} recipes found
                    </Typography>
                  ) : (
                    <Typography
                      variant="body1"
                      textAlign="center"
                      color="#1e88e5"
                    >
                      {filteredReceipes.length} recipe
                      {filteredReceipes.length > 1 ? "s" : ""} in the database
                    </Typography>
                  )}
                </Paper>
              </Fade>
            </Grid>
          </Grid>
        </Container>
        <ReceipeModal
          open={open}
          onClose={handleCloseModal}
          editingReceipe={editedReceipe}
        />
      </CssBaseline>
    </ThemeProvider>
  );
}
