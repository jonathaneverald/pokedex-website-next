import React from "react";
import logo from "../public/pokedex-logo.svg";

export const Header = () => {
  return (
    <>
      <header>
        <div className="relative h-[300px] overflow-hidden bg-[url('https://c4.wallpaperflare.com/wallpaper/379/892/940/pokemon-underwater-underwater-anime-pokemon-hd-art-wallpaper-preview.jpg')] bg-cover bg-[50%] bg-no-repeat">
          <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-black/60 bg-fixed">
            <div className="flex h-full items-center justify-center">
              <div className="flex flex-col items-center">
                <img
                  src="https://www.svgrepo.com/show/306584/pokemon.svg"
                  alt="Pokedex Logo"
                  className="size-2/3 "
                />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
