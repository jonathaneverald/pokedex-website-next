import { Header } from "@/components/Header";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { pokemonId } = context.params as { pokemonId: string };
  if (pokemonId === "0") {
    useRouter().push("/");
  }

  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
  );
  const fetchedPokemon = await response.json();
  const pokemon = {
    id: fetchedPokemon.id,
    name: fetchedPokemon.name,
    type: fetchedPokemon.types[0].type.name,
    image: fetchedPokemon.sprites.other.dream_world.front_default,
    hp: fetchedPokemon.stats[0].base_stat,
    speed: fetchedPokemon.stats[5].base_stat,
    atk: fetchedPokemon.stats[1].base_stat,
    special_atk: fetchedPokemon.stats[3].base_stat,
    def: fetchedPokemon.stats[2].base_stat,
    special_def: fetchedPokemon.stats[4].base_stat,
  };

  return {
    props: { pokemon: pokemon },
  };
};

export default function PokemonCardPage({
  pokemon,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const colors: { [key: string]: string } = {
    normal: "bg-normal",
    fire: "bg-fire",
    water: "bg-water",
    electric: "bg-electric",
    grass: "bg-grass",
    ice: "bg-ice",
    fighting: "bg-fighting",
    poison: "bg-poison",
    ground: "bg-ground",
    flying: "bg-flying",
    psychic: "bg-psychic",
    bug: "bg-bug",
    rock: "bg-rock",
    ghost: "bg-ghost",
    dragon: "bg-dragon",
    dark: "bg-dark",
    steel: "bg-steel",
    fairy: "bg-fairy",
  };

  const style = `max-w-screen-100 mx-auto py-8 px-4 lg:py-16 lg:px-6 ${
    colors[pokemon.type]
  }`;

  const navigate = useRouter();
  const handleBack = () => {
    setTimeout(() => {
      navigate.push("/");
    }, 200);
  };
  const handlePrevious = () => {
    const currentPokemonId = pokemon.id - 1;
    setTimeout(() => {
      navigate.push(`/pokemon-card/${currentPokemonId}`);
    }, 200);
  };
  const handleNext = () => {
    const currentPokemonId = pokemon.id + 1;
    setTimeout(() => {
      navigate.push(`/pokemon-card/${currentPokemonId}`);
    }, 200);
  };

  return (
    <>
      <Header />
      <div className={style}>
        <div className="text-center mb-10">
          <h2 className="text-4xl tracking-tight font-bold text-primary-800 capitalize">
            {pokemon.name}
          </h2>
          <h3 className="text-xl tracking-tight font-bold text-primary-800 capitalize">
            {pokemon.type}
          </h3>
        </div>

        <div className="flex flex-col md:flex-row">
          <div className="mr-0 md:mr-8 mb-6 md:mb-0 flex items-center">
            <img
              className="w-1/2 md:w-full mx-auto size-1/2 object-contain"
              src={pokemon.image}
              alt="Pokemon Pict"
            />
          </div>
          <div className="flex-1 flex flex-col sm:flex-row flex-wrap -mb-4 -mx-2">
            <div className="w-full sm:w-1/2 mb-4 px-2 ">
              <div className="h-full py-4 px-6 border-2 border-slate-950 rounded-xl">
                <h3 className="text-2xl font-bold text-md mb-6">HP</h3>
                <p className="text-2xl font-bold">{pokemon.hp}</p>
              </div>
            </div>
            <div className="w-full sm:w-1/2 mb-4 px-2 ">
              <div className="h-full py-4 px-6 border-2 border-slate-950 rounded-xl">
                <h3 className="text-2xl font-bold text-md mb-6">Speed</h3>
                <p className="text-2xl font-bold">{pokemon.speed}</p>
              </div>
            </div>

            <div className="w-full sm:w-1/2 mb-4 px-2 ">
              <div className="h-full py-4 px-6 border-2 border-slate-950 rounded-xl">
                <h3 className="text-2xl font-bold text-md mb-6">Attack</h3>
                <p className="text-2xl font-bold">{pokemon.atk}</p>
              </div>
            </div>

            <div className="w-full sm:w-1/2 mb-4 px-2 ">
              <div className="h-full py-4 px-6 border-2 border-slate-950 rounded-xl">
                <h3 className="text-2xl font-bold text-md mb-6">
                  Special Attack
                </h3>
                <p className="text-2xl font-bold">{pokemon.special_atk}</p>
              </div>
            </div>

            <div className="w-full sm:w-1/2 mb-4 px-2 ">
              <div className="h-full py-4 px-6 border-2 border-slate-950 rounded-xl">
                <h3 className="text-2xl font-bold text-md mb-6">Defense</h3>
                <p className="text-2xl font-bold">{pokemon.def}</p>
              </div>
            </div>

            <div className="w-full sm:w-1/2 mb-4 px-2 ">
              <div className="h-full py-4 px-6 border-2 border-slate-950 rounded-xl">
                <h3 className="text-2xl font-bold text-md mb-6">
                  Special Defense
                </h3>
                <p className="text-2xl font-bold">{pokemon.special_def}</p>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={handlePrevious}
          className="text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm m-2 px-5 py-2.5 text-center"
        >
          Previous
        </button>
        <button
          onClick={handleBack}
          className="text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm m-2 px-5 py-2.5 text-center"
        >
          Back to Home
        </button>
        <button
          onClick={handleNext}
          className="text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm m-2 px-5 py-2.5 text-center"
        >
          Next
        </button>
      </div>
    </>
  );
}
