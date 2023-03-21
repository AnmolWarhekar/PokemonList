import React from "react";
import { Route, Routes } from "react-router-dom";
import PokemonDetails from "./PokemonDetails/PokemonDetails";
import PokemonList from "./PokemonList/PokemonList";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<PokemonList />} />
      <Route path="/:id" element={<PokemonDetails />} />
    </Routes>
  );
};

export default App;
