import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useState, useEffect } from "react";

import { recipeDatabase } from "../../config/classes";
import Recipe, { Ingredient } from "../../types/Recipe";
import Divider from "@mui/material/Divider";
import { Meal } from "../../types/Meal";

interface IProps {
  /**
   * If the modal is opened
   */
  open: boolean;

  /**
   * Called when the modal is closed
   */
  onClose: () => void;

  /**
   * If this is given, the modal will go on edit mode
   */
  meal?: Meal;
}

export default function MealModal({ open, onClose, meal }: IProps) {
  if (meal !== undefined) {
    return (
      <CssBaseline>
        <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth>
          <DialogTitle>
            {meal.getMealName()} scheduled for{" "}
            {meal.getMealDate().toLocaleDateString()} for {meal.getmealEaters()}{" "}
            persons
          </DialogTitle>
          <DialogContent>
            {meal.getmealRecipe().map((r, index) => (
              <div key={index}>
                <DialogContentText
                  variant="h3"
                  color="black"
                  sx={{ marginTop: "15px" }}
                >
                  Receipe {index + 1}
                </DialogContentText>
                <DialogContentText
                  variant="body1"
                  color="black"
                  sx={{ whiteSpace: "pre-line" }}
                >
                  {r.getName()} <br />
                  {r.getExplanation()}
                </DialogContentText>
                <DialogContentText sx={{ marginTop: "15px" }}>
                  Ingredients for this receipe <br />
                  {r.getIngredients().map((i) => (
                    <p>
                      {i[0]} {i[1]}
                    </p>
                  ))}
                </DialogContentText>
                <Divider />
              </div>
            ))}
          </DialogContent>
        </Dialog>
      </CssBaseline>
    );
  } else {
    return (
      <CssBaseline>
        <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth>
          <DialogTitle>Loading</DialogTitle>
          <DialogContent>Loading</DialogContent>
        </Dialog>
      </CssBaseline>
    );
  }
}
