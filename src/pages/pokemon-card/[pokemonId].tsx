import { Header } from "@/components/Header";
import { PokemonWeaknesses } from "@/components/PokemonWeakness";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { useRouter } from "next/router";

interface Weakness {
  name: string;
  url: string;
}

interface Abilities {
  name: string;
  url: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { pokemonId } = context.params as { pokemonId: string };
  if (pokemonId === "0") {
    useRouter().push("/");
  }

  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
  );
  const fetchedPokemon = await response.json();

  const fetchDesc = await fetch(fetchedPokemon.species.url);
  const responseDesc = await fetchDesc.json();
  const desc: string = responseDesc.flavor_text_entries[4].flavor_text;
  const regex = /[\n\f]/g;
  const pokemonDesc = desc.replace(regex, " ");

  const fetchWeak = await fetch(fetchedPokemon.types[0].type.url);
  const responseWeak = await fetchWeak.json();
  const weaknesses = responseWeak.damage_relations.double_damage_from;
  console.log(weaknesses, "line 36");

  const fetchedWeaknesses: Weakness[] = weaknesses;
  const weaknessNames: string[] = fetchedWeaknesses.map(
    (weakness) => weakness.name
  );

  const pokemon = {
    id: fetchedPokemon.id,
    name: fetchedPokemon.name,
    type: fetchedPokemon.types[0].type.name,
    image: fetchedPokemon.sprites.other.showdown.front_default,
    hp: fetchedPokemon.stats[0].base_stat,
    speed: fetchedPokemon.stats[5].base_stat,
    atk: fetchedPokemon.stats[1].base_stat,
    special_atk: fetchedPokemon.stats[3].base_stat,
    def: fetchedPokemon.stats[2].base_stat,
    special_def: fetchedPokemon.stats[4].base_stat,
    desc: pokemonDesc,
    height: fetchedPokemon.height,
    weight: fetchedPokemon.weight,
    ability: fetchedPokemon.abilities[0].ability.name,
    weakness: weaknessNames,
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

  const imgStyle = `size-72 object-contain p-5 rounded-xl ${
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
      <div className="flex flex-col justify-center content-center place-content-center place-items-center h-full w-full">
        <div className="flex flex-col bg-slate-300 m-4 rounded-xl p-2">
          <h1 className="capitalize text-xl font-bold">
            {pokemon.name} #{pokemon.id}
          </h1>
          <h2 className="capitalize text-lg font-semibold">{pokemon.type}</h2>
          <div className="grid grid-cols-2 gap-4 p-2 m-2">
            <div className="flex flex-col items-center">
              <img className={imgStyle} src={pokemon.image} />
            </div>
            <div className="place-self-center">
              <p className="text-xl font-medium">{pokemon.desc}</p>
              <div className="grid grid-cols-3 rounded-xl font-bold py-5 my-5">
                <div className="flex flex-col place-self-center">
                  <p>Ability</p>
                  <p className="capitalize">{pokemon.ability}</p>
                </div>
                <div className="flex flex-col place-self-center">
                  <p>Weight</p>
                  <p>{pokemon.weight}gr</p>
                </div>
                <div className="flex flex-col place-self-center">
                  <p>Height</p>
                  <p>{pokemon.height}mm</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 rounded-xl font-bold">
              <div className="flex flex-col place-self-center">
                <p>Attack</p>
                <p>{pokemon.atk}</p>
              </div>
              <div className="flex flex-col place-self-center">
                <p>Defense</p>
                <p>{pokemon.def}</p>
              </div>
              <div className="flex flex-col place-self-center">
                <p>HP</p>
                <p>{pokemon.hp}</p>
              </div>
              <div className="flex flex-col place-self-center">
                <p>Special Attack</p>
                <p>{pokemon.special_atk}</p>
              </div>
              <div className="flex flex-col place-self-center">
                <p>Special Defense</p>
                <p>{pokemon.special_def}</p>
              </div>
              <div className="flex flex-col place-self-center">
                <p>Speed</p>
                <p>{pokemon.speed}</p>
              </div>
            </div>
            <div className="flex flex-col place-self-center">
              <h1 className="font-bold p-5">Weaknesses</h1>
              <div className="flex flex-row gap-2 justify-center">
                {pokemon.weakness.map((weaknessName: string) => (
                  <PokemonWeaknesses name={weaknessName} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center p-2 m-2">
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
            Explore More Pokémon
          </button>
          <button
            onClick={handleNext}
            className="text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm m-2 px-5 py-2.5 text-center"
          >
            Next
          </button>
        </div>
      </div>
      {/* <Header /> */}
    </>
  );
}
