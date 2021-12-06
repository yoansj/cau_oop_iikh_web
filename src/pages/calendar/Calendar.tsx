import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Fade from "@mui/material/Fade";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import React, { useEffect } from "react";
import theme from "../../config/theme";

import Box from "@mui/material/Box";
import { DateRange } from "@mui/lab/DateRangePicker";
import TextField from "@mui/material/TextField";
import StaticDateRangePicker from "@mui/lab/StaticDateRangePicker";
import DateFnsAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import PlannedMealModal from "./PlannedMealModal";
import { planner } from "../../config/classes";
import MealCard from "./MealCard";
import { Meal } from "../../types/Meal";
import MealModal from "./MealModal";

export default function Calendar() {
  const navigate = useNavigate();

  const [value, setValue] = React.useState<DateRange<Date>>([null, null]);
  const [open, setOpen] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const [meals, setMeals] = React.useState<Meal[]>([]);
  const [selectedMeal, setSelectedMeal] = React.useState<Meal | undefined>(
    undefined
  );
  const [openMeal, setOpenMeal] = React.useState(false);

  const handleGenerateGroceryToday = () => {
    let file = "";
    file += "Groceries list for " + new Date().toLocaleDateString() + "\n";
    planner.generateGroceriesToday().forEach((tuple, index) => {
      file += tuple[0] + " " + tuple[1] + "\n";
    });
    const blob = new Blob([file]);
    const url = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = "today-groceries.txt";
    a.click();
  };

  const handleGenerateGroceryPeriod = () => {
    let file = "Groceries list for period\n";
    if (value[0] !== null && value[1] !== null)
      file +=
        value[0].toLocaleDateString() +
        " " +
        value[1].toLocaleDateString() +
        "\n";
    planner
      .generateGroceriesForPeriod(value[0], value[1])
      .forEach((tuple, index) => {
        file += tuple[0] + " " + tuple[1] + "\n";
      });
    const blob = new Blob([file]);
    const url = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = "period-groceries.txt";
    a.click();
  };

  useEffect(() => {
    setMeals(planner.getAllPlannedMeals());
  }, [refresh]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <LocalizationProvider dateAdapter={DateFnsAdapter}>
          <Container maxWidth="xl">
            <Grid
              container
              direction="row"
              justifyContent="center"
              spacing={5}
              sx={{ marginTop: "20vh" }}
            >
              <Grid item>
                <Typography variant="h2" textAlign="center">
                  Calendar
                </Typography>
                <StaticDateRangePicker
                  displayStaticWrapperAs="desktop"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(startProps, endProps) => (
                    <React.Fragment>
                      <TextField {...startProps} />
                      <Box sx={{ mx: 2 }}> to </Box>
                      <TextField {...endProps} />
                    </React.Fragment>
                  )}
                />
                <Grid
                  item
                  container
                  direction="column"
                  sx={{ marginTop: "2.5vh" }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleGenerateGroceryPeriod}
                    disabled={value[0] === null || value[1] === null}
                  >
                    Generate grocery list for this period
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleGenerateGroceryToday}
                  >
                    Generate grocery list for today
                  </Button>
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="h2" textAlign="center">
                  Planned meals
                </Typography>
                <Grid item container direction="column" alignItems="center">
                  {meals.map((meal, index) => (
                    <MealCard
                      meal={meal}
                      key={index}
                      onDelete={() => setRefresh((r) => !r)}
                      onOpen={(m) => {
                        setSelectedMeal(m);
                        setOpenMeal(true);
                      }}
                    />
                  ))}
                </Grid>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setOpen(true)}
                  sx={{ marginTop: "2.5vh", marginLeft: "4vw" }}
                >
                  Add a new planned meal
                </Button>
              </Grid>
            </Grid>
          </Container>
          <PlannedMealModal open={open} onClose={() => setOpen(false)} />
          <MealModal
            open={openMeal}
            onClose={() => {
              setOpenMeal(false);
              setSelectedMeal(undefined);
            }}
            meal={selectedMeal}
          />
        </LocalizationProvider>
      </CssBaseline>
    </ThemeProvider>
  );
}
