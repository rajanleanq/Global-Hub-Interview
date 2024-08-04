import React from "react";
import useStore from "../../../../../../store/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchPokemonByHabitat, fetchPokemonHabitat } from "../../data/api";
import { IPokemonFilterBy } from "../../data/entity";
import InputSkeleton from "../../../../../../components/molecule/skeleton/input-skeleton";
import { cn } from "../../../../../../core/lib/utils";
import XSvg from "../../../../../../assets/svg/x.svg";

export default function MobileHabitatFilter({
  clearFn,
}: {
  clearFn: () => void;
}) {
  const { data: pokemonHabitat, isFetching: pokemonHabitatFetching } = useQuery(
    {
      queryKey: ["pokemon-habitat"],
      queryFn: async () => await fetchPokemonHabitat(),
    }
  );
  const { setPokemon, setPokemonDataLoading, setHabitat, habitat } = useStore();
  const pokemonHabitatMutation = useMutation({
    mutationFn: async ({ name }: IPokemonFilterBy) =>
      await fetchPokemonByHabitat({ name }),
  });
  const habitatChangeHandler = async (value: string) => {
    try {
      setPokemonDataLoading(true);
      clearFn();
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
  return (
    <>
      {!pokemonHabitatFetching ? (
        <div className=" flex flex-col gap-2">
          <p className="text-black font-semibold">By habitat</p>
          <div className="flex flex-row gap-2 flex-wrap">
            {pokemonHabitat?.results?.map((p) => (
              <div
                onClick={() => habitatChangeHandler(p?.name)}
                className={cn(
                  "border rounded-lg px-2 py-1 text-[13px] w-max flex items-center gap-2",
                  habitat === p?.name ? "bg-green-100 border-green-800" : ""
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
    </>
  );
}
