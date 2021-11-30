import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import ReceipeDisplay from "./pages/receipes/ReceipeDisplay";
import Receipes from "./pages/receipes/Receipes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/receipes" element={<Receipes />} />
        <Route path="/receipe/:id" element={<ReceipeDisplay />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
