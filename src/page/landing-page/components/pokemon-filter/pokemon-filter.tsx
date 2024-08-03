import SearchInput from "../../../../components/atom/input/search-input/search-input";
import { ReactSelect } from "../../../../components/atom/select/select";
import { useQuery } from "@tanstack/react-query";
import {
  IResult,
  fetchPokemonGender,
  fetchPokemonHabitat,
  fetchPokemonRegion,
} from "./data/api";
import useStore from "../../../../store/store";
import { ChangeEvent } from "react";
import InputSkeleton from "../../../../components/molecule/skeleton/input-skeleton";

export default function PokemonFilter() {
  const {
    gender,
    setGender,
    habitat,
    setHabitat,
    setRegion,
    region,
    setName,
    name,
  } = useStore();
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
  return (
    <div className="min-w-[300px] border-r p-4  relative">
      <div className="w-[266px] fixed flex flex-col gap-6">
        <SearchInput
          placeHolder="Search pokemon by name"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          value={name || ""}
        />

        {!pokemonGenderFetching ? (
          <ReactSelect
            placeholder="Filter by gender"
            options={optionHandler(pokemonGender?.results as IResult[])}
            onChange={(e: any) => setGender(e?.value)}
            value={valueHandler(gender)}
          />
        ) : (
          <InputSkeleton />
        )}
        {!pokemonHabitatFetching ? (
          <ReactSelect
            placeholder="Filter by habitat"
            onChange={(e: any) => setHabitat(e?.value)}
            value={valueHandler(habitat)}
            options={optionHandler(pokemonHabitat?.results as IResult[])}
          />
        ) : (
          <InputSkeleton />
        )}
        {!pokemonRegionFetching ? (
          <ReactSelect
            placeholder="Filter by region"
            onChange={(e: any) => setRegion(e?.value)}
            value={valueHandler(region)}
            options={optionHandler(pokemonRegion?.results as IResult[])}
          />
        ) : (
          <InputSkeleton />
        )}
      </div>
    </div>
  );
}
