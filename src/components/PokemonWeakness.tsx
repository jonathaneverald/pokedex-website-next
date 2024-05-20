import React from "react";

export const PokemonWeaknesses = (props: { name: string }) => {
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
  const style = `${
    colors[props.name]
  } place-self-center p-5 rounded-xl capitalize font-semibold`;
  return <p className={style}>{props.name}</p>;
};
