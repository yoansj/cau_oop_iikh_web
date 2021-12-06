import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Fade from "@mui/material/Fade";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import theme from "../../config/theme";

export default function Home() {
  const navigate = useNavigate();

  const handleNavigateRecipes = () => navigate("/recipes");
  const handleNavigateCalendar = () => navigate("/calendar");

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
                  onClick={handleNavigateRecipes}
                >
                  Browse recipes
                </Button>
              </Fade>
            </Grid>
            <Grid item>
              <Fade in timeout={1200}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleNavigateCalendar}
                >
                  Calendar
                </Button>
              </Fade>
            </Grid>
          </Grid>
        </Container>
      </CssBaseline>
    </ThemeProvider>
  );
}
