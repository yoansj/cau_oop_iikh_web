import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Fade from "@mui/material/Fade";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import React, { useMemo, useState } from "react";

import { receipeDatabase } from "../../config/classes";
import NewReceipeModal from "./NewReceipeModal";

export default function Receipes() {
  /* General states */
  const [search, setSearch] = useState("");
  const filteredReceipes = useMemo(() => {
    if (search === "") {
      return receipeDatabase.getAllReceipes();
    } else {
      return receipeDatabase.getReceipesByName(search);
    }
  }, [search]);

  /* Modal states */
  const [open, setOpen] = useState(false);

  /* Handlers */

  // Input handlers
  const handleSearchChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => setSearch(event.target.value);

  // Modal handlers
  const handleCloseModal = () => {
    setOpen(false);
  };
  const handleOpenModal = () => setOpen(true);

  return (
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
              <Paper sx={{ height: "100%" }} elevation={8}>
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  sx={{ paddingTop: "20px" }}
                >
                  {filteredReceipes.map((receipe) => (
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
                          <Typography variant="h5">
                            {receipe.getName()}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="body1">
                            {receipe.getExplanation().length > 50
                              ? receipe.getExplanation().substr(0, 50) + "..."
                              : receipe.getExplanation()}
                          </Typography>
                        </Grid>
                        <Grid item container direction="row" spacing={1}>
                          <Grid item>
                            <Button
                              color="primary"
                              variant="outlined"
                              size="small"
                            >
                              Open receipe
                            </Button>
                          </Grid>
                          <Grid item>
                            <Button
                              color="success"
                              variant="outlined"
                              size="small"
                            >
                              Edit receipe
                            </Button>
                          </Grid>
                          <Grid item>
                            <Button
                              color="error"
                              variant="outlined"
                              size="small"
                            >
                              Delete receipe
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Paper>
                  ))}
                </Grid>
              </Paper>
            </Fade>
          </Grid>
        </Grid>
      </Container>
      <NewReceipeModal open={open} onClose={handleCloseModal} />
    </CssBaseline>
  );
}
