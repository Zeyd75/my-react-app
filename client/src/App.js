import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Clubs from "./pages/Clubs";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Nations from "./pages/Nations";
import Players from "./pages/Players";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/players" element={<Players />} />
        <Route path="/clubs" element={<Clubs />} />
        <Route path="/nations" element={<Nations />} />
        {/* le path * s'active si aucun chemin valide ne figure dans l'url */}
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
