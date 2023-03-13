import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PokemonList.css";

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    loadPokemon("https://pokeapi.co/api/v2/pokemon?limit=20");
  }, []);

  const loadPokemon = async (url) => {
    const response = await axios.get(url);
    setPokemonList((prevList) => [...prevList, ...response.data.results]);
    setNextUrl(response.data.next);
  };

  const handleLoadMore = () => {
    if (nextUrl) {
      loadPokemon(nextUrl);
    }
  };

  const handlePokemonClick = async (pokemon) => {
    const response = await axios.get(pokemon.url);
    setSelectedPokemon(response.data);
  };

  return (
    <div className="container">
      <h1>Pokemon List</h1>
      <ul className="pokemon-list">
        {pokemonList.map((pokemon) => (
          <li key={pokemon.name} onClick={() => handlePokemonClick(pokemon)}>
            {pokemon.name}
          </li>
        ))}
      </ul>
      <button onClick={handleLoadMore}>Load More</button>
      {selectedPokemon && (
        <div className="pokemon-details">
          <h2>{selectedPokemon.name}</h2>
          <img
            src={selectedPokemon.sprites.front_default}
            alt={selectedPokemon.name}
          />
          <p>Weight: {selectedPokemon.weight} lbs</p>
          <p>Height: {selectedPokemon.height} inches</p>
        </div>
      )}
    </div>
  );
};

export default PokemonList;
