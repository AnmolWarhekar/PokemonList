import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
const PokemonDetails = () => {
  const [pokemon, setPokemon] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    loadPokemon(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  }, []);

  const loadPokemon = async (url) => {
    const response = await axios.get(url);
    setPokemon(response.data);
  };
  return (
    <>
      <div className="pokemon-details">
        <h2>{pokemon?.name}</h2>
        <img src={pokemon?.sprites?.front_default} alt={pokemon?.name} />
        <p>Weight: {pokemon?.weight} lbs</p>
        <p>Height: {pokemon?.height} inches</p>

        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Back
        </button>
      </div>
    </>
  );
};

export default PokemonDetails;
