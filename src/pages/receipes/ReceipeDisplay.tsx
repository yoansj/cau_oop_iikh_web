import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Fade from "@mui/material/Fade";
import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../config/theme";

import { receipeDatabase } from "../../config/classes";
import Receipe from "../../types/Receipe";
import { useParams } from "react-router-dom";

export default function ReceipeDisplay() {
  const { id } = useParams();

  const [receipe, setReceipe] = useState<Receipe>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const foundReceipe = receipeDatabase.getReceipeById(id || "nosuchidsadly");

    if (foundReceipe === undefined) {
      setIsLoading(false);
      setError(true);
    } else {
      setIsLoading(false);
      setReceipe(foundReceipe);
    }
  }, [id]);

  if (isLoading === false && error) {
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
              sx={{ marginTop: "28vh" }}
            >
              <Grid item>
                <Fade in timeout={1000}>
                  <Typography variant="h2" textAlign="center">
                    There was an error
                  </Typography>
                </Fade>
              </Grid>
              <Grid item>
                <Fade in timeout={1400}>
                  <Typography variant="h6" textAlign="center">
                    This receipe does not exist
                  </Typography>
                </Fade>
              </Grid>
              <Grid item>
                <Fade in timeout={1800}>
                  <Typography variant="body1" textAlign="center">
                    Please go back to another page
                  </Typography>
                </Fade>
              </Grid>
            </Grid>
          </Container>
        </CssBaseline>
      </ThemeProvider>
    );
  } else if (isLoading === false && error === false && receipe !== undefined) {
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
              sx={{ marginTop: "3vh" }}
            >
              <Grid item>
                <Fade in timeout={1000}>
                  <Typography variant="h2" textAlign="center">
                    {receipe.getName()}
                  </Typography>
                </Fade>
              </Grid>
              <Grid item>
                <Fade in timeout={1400}>
                  <Typography variant="h6" textAlign="center">
                    Explanation of the receipe
                  </Typography>
                </Fade>
                <Fade in timeout={1400}>
                  <Typography variant="body1" textAlign="center">
                    {receipe.getExplanation()}
                  </Typography>
                </Fade>
              </Grid>
            </Grid>
          </Container>
        </CssBaseline>
      </ThemeProvider>
    );
  } else {
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
              sx={{ marginTop: "30vh" }}
            >
              <Grid item>
                <Fade in timeout={1000}>
                  <Typography variant="h2" textAlign="center">
                    There was an error
                  </Typography>
                </Fade>
              </Grid>
              <Grid item>
                <Fade in timeout={3000}>
                  <Typography variant="h6" textAlign="center">
                    This receipe does not exist
                  </Typography>
                </Fade>
              </Grid>
              <Grid item>
                <Fade in timeout={5000}>
                  <Typography variant="body1" textAlign="center">
                    Please go back to another page
                  </Typography>
                </Fade>
              </Grid>
            </Grid>
          </Container>
        </CssBaseline>
      </ThemeProvider>
    );
  }
}
