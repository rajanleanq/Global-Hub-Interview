import React from "react";
import useStore from "../../../../../../store/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchPokemonByGender, fetchPokemonGender } from "../../data/api";
import { IPokemonFilterBy } from "../../data/entity";
import InputSkeleton from "../../../../../../components/molecule/skeleton/input-skeleton";
import { cn } from "../../../../../../core/lib/utils";
import XSvg from "../../../../../../assets/svg/x.svg";

export default function MobileGenderFilter({
  clearFn,
}: {
  clearFn: () => void;
}) {
  const { data: pokemonGender, isFetching: pokemonGenderFetching } = useQuery({
    queryKey: ["pokemon-gender"],
    queryFn: async () => await fetchPokemonGender(),
  });
  const { setPokemon, setPokemonDataLoading, setGender, gender } = useStore();
  const pokemonGenderMutation = useMutation({
    mutationFn: async ({ name }: IPokemonFilterBy) =>
      await fetchPokemonByGender({ name }),
  });
  const genderChangeHandler = async (value: string) => {
    try {
      setPokemonDataLoading(true);
      clearFn();
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
  return (
    <>
      {!pokemonGenderFetching ? (
        <div className=" flex flex-col gap-2">
          <p className="text-black font-semibold">By gender</p>
          <div className="flex flex-row gap-2">
            {pokemonGender?.results?.map((p) => (
              <div
                onClick={() => genderChangeHandler(p?.name)}
                className={cn(
                  "border rounded-lg px-2 py-1 text-[13px] w-max flex items-center gap-2",
                  gender === p?.name ? "bg-green-100 border-green-800" : ""
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
    </>
  );
}
