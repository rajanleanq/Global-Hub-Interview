import { Button } from "../../../../../../components/atom/button/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerOverlay,
  DrawerTitle,
} from "../../../../../../components/atom/drawer/vaul";
import InputSkeleton from "../../../../../../components/molecule/skeleton/input-skeleton";
import useStore from "../../../../../../store/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchPokemonByGender,
  fetchPokemonByHabitat,
  fetchPokemonGender,
  fetchPokemonHabitat,
  fetchPokemonRegion,
} from "../../data/api";
import { ReactSelect } from "../../../../../../components/atom/select/select";
import { IPokemonFilterBy, IResult } from "../../data/entity";

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
  } = useStore();
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

  const optionHandler = (payload: IResult[]) => {
    return payload?.map((p) => ({ value: p.name, label: p.name }));
  };
  const valueHandler = (value: string | null) => {
    if (value) {
      return { value, label: value };
    }
    return null;
  };
  const clearValues = () => {
    setGender(null);
    setHabitat(null);
    setRegion(null);
    setName(null);
  };
  const genderChangeHandler = async (value: string) => {
    try {
      clearValues();
      setGender(value);
      const response = await pokemonGenderMutation.mutateAsync({
        name: value,
      });
      setPokemon(
        response?.pokemon_species_details?.map((p) => p.pokemon_species)
      );
    } catch (err) {
      console.log(err);
    }
  };
  const habitatChangeHandler = async (value: string) => {
    try {
      clearValues();
      setHabitat(value);
      const response = await pokemonHabitatMutation.mutateAsync({
        name: value,
      });
      setPokemon(response?.pokemon_species);
    } catch (err) {
      console.log(err);
    }
  };

  const regionChangeHandler = (region: string) => {
    clearValues();
    setRegion(region);
  };

  return (
    <Drawer open={isOpen} closeThreshold={0.5} onClose={onClose}>
      <DrawerOverlay className="bg-gray-900 bg-opacity-20" onClick={onClose} />
      <DrawerContent className="px-[16px] py-[24px] bg-white">
        <div className="mx-auto w-full">
          <DrawerHeader>
            <DrawerTitle className="w-full flex justify-between">
              <h2 className="text-gray-800 text-[20px] font-700 font-['Playfair Display'] leading-20">
                {title}
              </h2>
              <div onClick={onClose}>
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
              </div>
            </DrawerTitle>
          </DrawerHeader>
          <DrawerDescription className="flex flex-col gap-6 h-max relative">
            {!pokemonRegionFetching ? (
              <ReactSelect
                placeholder="Filter by region"
                onChange={(e: any) => regionChangeHandler(e?.value)}
                value={valueHandler(region)}
                options={optionHandler(pokemonRegion?.results as IResult[])}
              />
            ) : (
              <InputSkeleton />
            )}
            {!pokemonHabitatFetching ? (
              <ReactSelect
                placeholder="Filter by habitat"
                onChange={(e: any) => habitatChangeHandler(e?.value)}
                value={valueHandler(habitat)}
                options={optionHandler(pokemonHabitat?.results as IResult[])}
              />
            ) : (
              <InputSkeleton />
            )}
            {!pokemonGenderFetching ? (
              <ReactSelect
                placeholder="Filter by gender"
                options={optionHandler(pokemonGender?.results as IResult[])}
                onChange={(e: any) => genderChangeHandler(e?.value)}
                value={valueHandler(gender)}
              />
            ) : (
              <InputSkeleton />
            )}
          </DrawerDescription>
          <Button
            onClick={onClose}
            className="bg-blue-400 text-white text-center w-full  hover:bg-blue-500 hover:opacity-85 rounded-lg mt-6"
          >
            Show Results
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
