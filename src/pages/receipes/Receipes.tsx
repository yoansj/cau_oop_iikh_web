import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Fade from "@mui/material/Fade";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import React from "react";

export default function Receipes() {
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
                  variant="outlined"
                  color="primary"
                  focused
                  sx={{ width: "100%" }}
                />
              </Fade>
            </Grid>
            <Grid item xs={2}>
              <Fade in timeout={1200}>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ width: "100%", height: "100%" }}
                >
                  New receipe
                </Button>
              </Fade>
            </Grid>
          </Grid>
          <Grid item sx={{ width: "67%", height: "70vh" }}>
            <Fade in timeout={1400}>
              <Paper sx={{ height: "100%" }} elevation={8}></Paper>
            </Fade>
          </Grid>
        </Grid>
      </Container>
    </CssBaseline>
  );
}
