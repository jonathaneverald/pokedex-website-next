import { Header } from "@/components/Header";
import { SearchPokemon } from "@/components/SearchPokemon";
import React, { useState } from "react";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import PokemonThumbnail from "../components/PokemonThumbnail";
import { Head } from "next/document";

export const getServerSideProps: GetServerSideProps = async () => {
  //Fetch data from pokeapi
  const loadPokemon = "https://pokeapi.co/api/v2/pokemon?limit=20";
  const response = await fetch(loadPokemon);
  if (!response.ok) {
    throw new Error("Failed to fetch Pokemon");
  }
  const pokemons = await response.json();

  const fetchData = pokemons.results.map(async (pokemon: any) => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
    );
    const data = await response.json();
    return {
      id: data.id,
      name: data.name,
      image: data.sprites.other.showdown.front_default,
      type: data.types[0].type.name,
    };
  });
  const pokemonObject = await Promise.all(fetchData);

  return { props: { pokemonObject: pokemonObject, nextPage: pokemons.next } };
};

export default function Home({
  pokemonObject,
  nextPage,
}: {
  pokemonObject: any[];
  nextPage: string;
}) {
  const [allPokemons, setAllPokemons] = useState<any[]>(pokemonObject);
  const [loadMore, setLoadMore] = useState<string>(nextPage);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchAllPokemons = async () => {
    setIsLoading(true);
    const response = await fetch(loadMore);
    if (!response.ok) {
      throw new Error("Failed to fetch Pokemon");
    }
    const data = await response.json();
    setLoadMore(data.next);

    const fetchPokemon = data.results.map(async (pokemon: any) => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
      );
      const data = await response.json();
      return {
        id: data.id,
        name: data.name,
        image: data.sprites.other.showdown.front_default,
        type: data.types[0].type.name,
      };
    });
    const createPokemonObject = await Promise.all(fetchPokemon);
    setAllPokemons((oldPokemons) => [...oldPokemons, ...createPokemonObject]);
    setIsLoading(false);
  };

  return (
    <>
      <main>
        <Header />
        <section>
          <SearchPokemon />
          <div className="pokemon-container">
            <div className="pokemon-cards w-fit mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
              {allPokemons.map((pokemon) => (
                <PokemonThumbnail
                  id={pokemon.id}
                  name={pokemon.name}
                  image={pokemon.image}
                  type={pokemon.type}
                />
              ))}
            </div>
            {!isLoading && (
              <button
                onClick={fetchAllPokemons}
                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              >
                Load more Pokémons...
              </button>
            )}
            {isLoading && (
              <button className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                Loading...
              </button>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
