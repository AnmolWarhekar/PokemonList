import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PokemonList.css";
import { useNavigate } from "react-router-dom";

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadPokemon("https://pokeapi.co/api/v2/pokemon?limit=20");
  }, []);

  const loadPokemon = async (url) => {
    const response = await axios.get(url);
    setPokemonList((prevList) => [...prevList, ...response.data.results]);
    setNextUrl(response.data.next);
  };
  console.log(pokemonList);
  const handleLoadMore = () => {
    if (nextUrl) {
      loadPokemon(nextUrl);
    }
  };

  const handlePokemonClick = async (pokemon) => {
    const url = pokemon.url.split("/");
    const id = url[url.length - 2];
    navigate(`/${id}`);
  };

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterClick = () => {
    const filteredPokemon = pokemonList.filter((pokemon) =>
      pokemon.name.includes(searchTerm)
    );
    setPokemonList(filteredPokemon);
  };

  return (
    <div className="container">
      <h1>Pokemon List</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a Pokemon"
          value={searchTerm}
          onChange={handleSearchInputChange}
        />
        <button onClick={handleFilterClick}>Filter</button>
      </div>
      <ul className="pokemon-list">
        {pokemonList.map((pokemon) => (
          <li key={pokemon.name} onClick={() => handlePokemonClick(pokemon)}>
            {pokemon.name}
          </li>
        ))}
      </ul>
      <button onClick={handleLoadMore}>Load More</button>
    </div>
  );
};

export default PokemonList;
