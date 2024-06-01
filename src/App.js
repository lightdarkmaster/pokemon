import React, { useEffect, useState } from "react";
import PokemonThumbnail from "./Components/PokemonThumbnail";

function App() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [loadPoke, setLoadPoke] = useState('https://pokeapi.co/api/v2/pokemon?limit=500');
  const [search, setSearch] = useState(""); // New state for search input

  const getAllPokemons = async () => {
    const res = await fetch(loadPoke);
    const data = await res.json();
    setLoadPoke(data.next);

    const createPokemonObject = async (result) => {
      result.forEach(async (pokemon) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
        const data = await res.json();
        setAllPokemons((currentList) => [...currentList, data]);
      });
    };
    createPokemonObject(data.results);
  };

  useEffect(() => {
    getAllPokemons();
  }, []);

  // Function to handle search input changes
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  // Filter Pokémon based on search input
  const filteredPokemons = allPokemons.filter((pokemon) => {
    return (
      pokemon.name.toLowerCase().includes(search.toLowerCase()) ||
      pokemon.id.toString() === search
    );
  });

  return (
    <div className="app-container">
      <h1>Pokemon Kingdom</h1>

      <div className="search">
        <input
          className="searchInput"
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      <div className="pokemon-container">
        <div className="all-container">
          {filteredPokemons.map((pokemon, index) => (
            <PokemonThumbnail
              id={pokemon.id}
              name={pokemon.name}
              image={pokemon.sprites.other.dream_world.front_default}
              type={pokemon.types[0].type.name}
              key={index}
              height={pokemon.height}
              weight={pokemon.weight}
              stat1={pokemon.stats[0].stat.name}
              stat2={pokemon.stats[1].stat.name}
              stat3={pokemon.stats[2].stat.name}
              stat4={pokemon.stats[3].stat.name}
              stat5={pokemon.stats[4].stat.name}
              stat6={pokemon.stats[5].stat.name}
              bs1={pokemon.stats[0].base_stat}
              bs2={pokemon.stats[1].base_stat}
              bs3={pokemon.stats[2].base_stat}
              bs4={pokemon.stats[3].base_stat}
              bs5={pokemon.stats[4].base_stat}
              bs6={pokemon.stats[5].base_stat}
            />
          ))}
        </div>
        <button className="load-more" onClick={() => getAllPokemons()}>
          More Pokemons
        </button>
      </div>
    </div>
  );
}

export default App;
