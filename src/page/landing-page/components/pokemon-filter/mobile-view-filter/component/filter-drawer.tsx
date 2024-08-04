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
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchPokemonByGender,
  fetchPokemonByHabitat,
  fetchPokemonGender,
  fetchPokemonHabitat,
  fetchPokemonMainGeneration,
  fetchPokemonRegion,
  fetchPokemonRegionDetail,
} from "../../data/api";
import { IPokemonFilterBy } from "../../data/entity";
import XSvg from "../../../../../../assets/svg/x.svg";
import { cn, getIdFromUrl } from "../../../../../../core/lib/utils";
import { IPokemonResult } from "../../../../data/entity";
import { fetchPokemon } from "../../../../data/api";
import InputSkeleton from "../../../../../../components/molecule/skeleton/input-skeleton";
export default function FilterDrawer({
  isOpen,
  onClose,
  title,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}) {
  const {
    gender,
    setGender,
    habitat,
    setHabitat,
    setRegion,
    region,
    setName,
    setPokemon,
    setPokemonDataLoading
  } = useStore();
  const { data: pokemonData } = useQuery({
    queryKey: ["pokemon"],
    queryFn: async () => await fetchPokemon({ limit: 1000, offset: 0 }),
  });
  const pokemonGenderMutation = useMutation({
    mutationFn: async ({ name }: IPokemonFilterBy) =>
      await fetchPokemonByGender({ name }),
  });
  const pokemonHabitatMutation = useMutation({
    mutationFn: async ({ name }: IPokemonFilterBy) =>
      await fetchPokemonByHabitat({ name }),
  });
  const { data: pokemonGender, isFetching: pokemonGenderFetching } = useQuery({
    queryKey: ["pokemon-gender"],
    queryFn: async () => await fetchPokemonGender(),
  });
  const { data: pokemonHabitat, isFetching: pokemonHabitatFetching } = useQuery(
    {
      queryKey: ["pokemon-habitat"],
      queryFn: async () => await fetchPokemonHabitat(),
    }
  );
  const { data: pokemonRegion, isFetching: pokemonRegionFetching } = useQuery({
    queryKey: ["pokemon-region"],
    queryFn: async () => await fetchPokemonRegion(),
  });
  const pokemonGenerationMutation = useMutation({
    mutationFn: async (id: string | number) =>
      await fetchPokemonMainGeneration(id),
    mutationKey: ["pokemon-generation"],
  });
  const pokemonRegionMutation = useMutation({
    mutationFn: async (id: string | number) =>
      await fetchPokemonRegionDetail(id),
    mutationKey: ["pokemon-region"],
  });
  const clearValues = () => {
    setGender(null);
    setHabitat(null);
    setRegion(null);
    setName(null);
  };
  const genderChangeHandler = async (value: string) => {
    try {
      setPokemonDataLoading(true);
      clearValues();
      setGender(value);
      const response = await pokemonGenderMutation.mutateAsync({
        name: value,
      });
      if (response) {
        setPokemonDataLoading(false);
        setPokemon(
          response?.pokemon_species_details?.map((p) => p.pokemon_species)
        );
      }
    } catch (err) {
      setPokemonDataLoading(false);
    }
  };
  const habitatChangeHandler = async (value: string) => {
    try {
      setPokemonDataLoading(true);
      clearValues();
      setHabitat(value);
      const response = await pokemonHabitatMutation.mutateAsync({
        name: value,
      });
      if (response) {
        setPokemon(response?.pokemon_species);
        setPokemonDataLoading(false);
      }
    } catch (err) {
      setPokemonDataLoading(false);
    }
  };

  const regionChangeHandler = async (region: string) => {
    try {
      setPokemonDataLoading(true);
      clearValues();
      setRegion(region);
      const response = await pokemonRegionMutation.mutateAsync(region);
      if (response) {
        const region_pokemons = await pokemonGenerationMutation.mutateAsync(
          Number(getIdFromUrl(response?.main_generation?.url))
        );
        if (region_pokemons) {
          setPokemon(region_pokemons?.pokemon_species);
          setPokemonDataLoading(false);
        }
      }
    } catch (err) {
      setPokemonDataLoading(false);
    }
  };

  const resetHandler = () => {
    setPokemon(pokemonData?.results as IPokemonResult[]);
    setGender(null);
    setHabitat(null);
    setRegion(null);
    setName(null);
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
            {!pokemonGenderFetching ? (
              <div className=" flex flex-col gap-2">
                <p className="text-black font-semibold">By gender</p>
                <div className="flex flex-row gap-2">
                  {pokemonGender?.results?.map((p) => (
                    <div
                      onClick={() => genderChangeHandler(p?.name)}
                      className={cn(
                        "border rounded-lg px-2 py-1 text-[13px] w-max flex items-center gap-2",
                        gender === p?.name
                          ? "bg-green-100 border-green-800"
                          : ""
                      )}
                      key={p?.name}
                    >
                      <p>{p?.name}</p>
                      {gender === p?.name && (
                        <div className="max-w-4">
                          <img src={XSvg} alt="" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <InputSkeleton />
            )}
            {!pokemonHabitatFetching ? (
              <div className=" flex flex-col gap-2">
                <p className="text-black font-semibold">By habitat</p>
                <div className="flex flex-row gap-2 flex-wrap">
                  {pokemonHabitat?.results?.map((p) => (
                    <div
                      onClick={() => habitatChangeHandler(p?.name)}
                      className={cn(
                        "border rounded-lg px-2 py-1 text-[13px] w-max flex items-center gap-2",
                        habitat === p?.name
                          ? "bg-green-100 border-green-800"
                          : ""
                      )}
                      key={p?.name}
                    >
                      <p>{p?.name}</p>
                      {habitat === p?.name && (
                        <div className="max-w-4">
                          <img src={XSvg} alt="" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <InputSkeleton />
            )}
            {!pokemonRegionFetching ? (
              <div className=" flex flex-col gap-2">
                <p className="text-black font-semibold">By region</p>
                <div className="flex flex-row gap-2 flex-wrap">
                  {pokemonRegion?.results?.map((p) => (
                    <div
                      onClick={() => regionChangeHandler(p?.name)}
                      className={cn(
                        "border rounded-lg px-2 py-1 text-[13px] w-max flex items-center gap-2",
                        region === p?.name
                          ? "bg-green-100 border-green-800"
                          : ""
                      )}
                      key={p?.name}
                    >
                      <p>{p?.name}</p>
                      {region === p?.name && (
                        <div className="max-w-4">
                          <img src={XSvg} alt="" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <InputSkeleton />
            )}
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
