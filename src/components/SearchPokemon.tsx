import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { PokemonNotExist } from "./PokemonNotExist";

export const SearchPokemon = () => {
  const [pokemonName, setPokemonName] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [pokemonExist, setPokemonExist] = useState<boolean>(true);

  const navigate = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pokemonName) {
      setErrorMessage("Pokémon name search input can not be empty!");
      return;
    }

    const lowerCasePokemon = pokemonName.toLowerCase();
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${lowerCasePokemon}`
    );
    if (!response.ok) {
      localStorage.setItem("pokemon", lowerCasePokemon);
      setPokemonExist(false);
    }
    const pokemon = await response.json();
    setPokemonExist(true);

    const pokemonId = pokemon.id;
    setTimeout(() => {
      navigate.push(`/pokemon-card/${pokemonId}`);
    }, 500);
  };

  useEffect(() => {
    if (errorMessage) {
      const timeoutId = setTimeout(() => {
        setErrorMessage("");
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (!pokemonExist) {
      const timeoutId = setTimeout(() => {
        setPokemonExist(true);
      }, 2500);
      return () => clearTimeout(timeoutId);
    }
  }, [pokemonExist]);

  return (
    <>
      {!pokemonExist && <PokemonNotExist />}
      <div className="bg-pokemon-blue border-gray-200 px-4 lg:px-6 py-2.5 flex flex-wrap justify-center items-center">
        <form className="flex flex-col items-center justify-center px-6 py-8">
          <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
            Search Pokémon
          </label>
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => {
              setPokemonName(e.target.value);
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-m rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5"
          />
          {errorMessage && (
            <span className="text-red-800 text-sm font-bold">
              {errorMessage}
            </span>
          )}
          <button
            onClick={(e) => onSubmit(e)}
            className="text-white bg-blue-800 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm m-2 px-5 py-2.5 text-center"
          >
            Search
          </button>
        </form>
      </div>
    </>
  );
};
