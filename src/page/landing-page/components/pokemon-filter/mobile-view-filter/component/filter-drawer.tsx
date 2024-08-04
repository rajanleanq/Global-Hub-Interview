import { Button } from "../../../../../../components/atom/button/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerOverlay,
  DrawerTitle,
} from "../../../../../../components/atom/drawer/vaul";
import useStore from "../../../../../../store/store";
import { useQuery } from "@tanstack/react-query";
import { IPokemonResult } from "../../../../data/entity";
import { fetchPokemon } from "../../../../data/api";
import MobileGenderFilter from "./mobile-gender";
import MobileHabitatFilter from "./mobile-habitat-filter";
import MobileRegionFilter from "./mobile-region-filter";
export default function FilterDrawer({
  isOpen,
  onClose,
  title,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}) {
  const { setGender, setHabitat, setRegion, setName, setPokemon } = useStore();
  const { data: pokemonData } = useQuery({
    queryKey: ["pokemon"],
    queryFn: async () => await fetchPokemon({ limit: 1000, offset: 0 }),
  });

  const clearValues = () => {
    setGender(null);
    setHabitat(null);
    setRegion(null);
    setName(null);
  };

  const resetHandler = () => {
    setPokemon(pokemonData?.results as IPokemonResult[]);
    clearValues();
    onClose();
  };
  return (
    <Drawer open={isOpen} closeThreshold={0.5} onClose={onClose}>
      <DrawerOverlay className="bg-gray-900 bg-opacity-80" onClick={onClose} />
      <DrawerContent className="px-[16px] py-[24px] bg-white">
        <div className="mx-auto w-full">
          <DrawerHeader>
            <DrawerTitle className="w-full flex justify-between">
              <h2 className="text-gray-800 text-[20px] font-700 font-['Playfair Display'] leading-20">
                {title}
              </h2>
              <div onClick={onClose}>
                <CloseIcon />
              </div>
            </DrawerTitle>
          </DrawerHeader>
          <DrawerDescription className="flex flex-col gap-6 h-max relative">
            <MobileGenderFilter clearFn={clearValues} />
            <MobileHabitatFilter clearFn={clearValues} />
            <MobileRegionFilter clearFn={clearValues} />
          </DrawerDescription>
          <div className="flex gap-3">
            <Button
              onClick={resetHandler}
              className="bg-blue-400 text-white text-center   hover:bg-blue-500 hover:opacity-85 rounded-lg mt-6 w-max"
            >
              Reset
            </Button>
            <Button
              onClick={onClose}
              className="bg-green-600 text-white text-center w-full  hover:bg-green-500 hover:opacity-85 rounded-lg mt-6"
            >
              Show Results
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

const CloseIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M18.75 5.25L5.25 18.75"
        stroke="#313131"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M18.75 18.75L5.25 5.25"
        stroke="#313131"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
