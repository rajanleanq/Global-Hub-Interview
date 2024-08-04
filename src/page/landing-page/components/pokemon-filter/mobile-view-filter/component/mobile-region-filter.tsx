import React from "react";
import useStore from "../../../../../../store/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchPokemonMainGeneration,
  fetchPokemonRegion,
  fetchPokemonRegionDetail,
} from "../../data/api";
import InputSkeleton from "../../../../../../components/molecule/skeleton/input-skeleton";
import { cn, getIdFromUrl } from "../../../../../../core/lib/utils";
import XSvg from "../../../../../../assets/svg/x.svg";

export default function MobileRegionFilter({
  clearFn,
}: {
  clearFn: () => void;
}) {
  const { setPokemon, setPokemonDataLoading, setRegion, region } = useStore();
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
  const regionChangeHandler = async (region: string) => {
    try {
      setPokemonDataLoading(true);
      clearFn();
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
  return (
    <>
      {!pokemonRegionFetching ? (
        <div className=" flex flex-col gap-2">
          <p className="text-black font-semibold">By region</p>
          <div className="flex flex-row gap-2 flex-wrap">
            {pokemonRegion?.results?.map((p) => (
              <div
                onClick={() => regionChangeHandler(p?.name)}
                className={cn(
                  "border rounded-lg px-2 py-1 text-[13px] w-max flex items-center gap-2",
                  region === p?.name ? "bg-green-100 border-green-800" : ""
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
    </>
  );
}
