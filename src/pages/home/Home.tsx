import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Fade from "@mui/material/Fade";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function Home() {
  const navigate = useNavigate();

  const handleNavigateReceipes = () => navigate("/receipes");

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
          <Grid item sx={{ marginTop: "28vh" }}>
            <Fade in timeout={800}>
              <Typography variant="h1" textAlign="center">
                IIKH - Web
              </Typography>
            </Fade>
          </Grid>
          <Grid item>
            <Fade in timeout={1000}>
              <Button
                variant="contained"
                size="large"
                onClick={handleNavigateReceipes}
              >
                Browse receipes
              </Button>
            </Fade>
          </Grid>
          <Grid item>
            <Fade in timeout={1200}>
              <Button variant="contained" size="large">
                Calendar
              </Button>
            </Fade>
          </Grid>
          <Grid item>
            <Fade in timeout={1400}>
              <Button variant="contained" size="large">
                About
              </Button>
            </Fade>
          </Grid>
        </Grid>
      </Container>
    </CssBaseline>
  );
}
