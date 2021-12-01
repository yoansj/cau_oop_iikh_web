import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import RecipeDisplay from "./pages/recipes/RecipeDisplay";
import Recipes from "./pages/recipes/Recipes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/receipe/:id" element={<RecipeDisplay />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
