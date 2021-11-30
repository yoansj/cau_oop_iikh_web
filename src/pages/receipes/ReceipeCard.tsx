import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../config/theme";

import Receipe from "../../types/Receipe";

interface IProps {
  /**
   * Receipe object
   */
  receipe: Receipe;

  /**
   * Function called when the receipe needs to be edited
   */
  onEdit?: (receipe: Receipe) => void;
}

export default function ReceipeCard({ receipe, onEdit }: IProps) {
  const handleEdit = () => {
    if (onEdit) onEdit(receipe);
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
              <Typography variant="h5">{receipe.getName()}</Typography>
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
                <Button color="primary" variant="outlined" size="small">
                  Open receipe
                </Button>
              </Grid>
              <Grid item>
                <Button
                  color="success"
                  variant="outlined"
                  size="small"
                  onClick={handleEdit}
                >
                  Edit receipe
                </Button>
              </Grid>
              <Grid item>
                <Button color="error" variant="outlined" size="small">
                  Delete receipe
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </CssBaseline>
    </ThemeProvider>
  );
}
