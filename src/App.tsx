import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Receipes from "./pages/receipes/Receipes";
import "reflect-metadata";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/receipes" element={<Receipes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
