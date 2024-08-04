import { useQuery } from "@tanstack/react-query";
import {
  fetchPokemonGender,
  fetchPokemonHabitat,
  fetchPokemonRegion,
} from "./data/api";
import useStore from "../../../../store/store";
import InputSkeleton from "../../../../components/molecule/skeleton/input-skeleton";
import { fetchPokemon } from "../../data/api";
import { IResult } from "./data/entity";
import { IPokemonData, IPokemonResult } from "../../data/entity";
import { Button } from "../../../../components/atom/button/button";
import SearchInputFilter from "./component/search-input-filter";
import GenderFilter from "./component/gender-filter";
import HabitatFilter from "./component/habitat-filter";
import RegionFilter from "./component/region-filter";
export interface IOptions {
  label: string;
  value: string;
}
export default function PokemonFilter() {
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
  const { data: pokemonData } = useQuery({
    queryKey: ["pokemon"],
    queryFn: async () => await fetchPokemon({ limit: 1000, offset: 0 }),
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

  const valueHandler = (value: string | null) => {
    if (value) {
      return { value, label: value };
    }
    return null;
  };
  const optionHandler = (payload: IResult[]) => {
    return payload?.map((p) => ({ value: p.name, label: p.name }));
  };
  const clearValues = () => {
    setGender(null);
    setHabitat(null);
    setRegion(null);
    setName(null);
  };

  const resetHandler = () => {
    setPokemon(pokemonData?.results as IPokemonResult[]);
    clearValues();
  };
  return (
    <div className="min-w-[300px] border-r p-4  relative xs:hidden md:block">
      <div className="w-[266px] fixed flex flex-col gap-6">
        <SearchInputFilter pokemonData={pokemonData as IPokemonData} />
        {!pokemonGenderFetching ? (
          <GenderFilter
            clearFn={clearValues}
            options={optionHandler(pokemonGender?.results as IResult[])}
            value={valueHandler(gender)}
          />
        ) : (
          <InputSkeleton />
        )}
        {!pokemonHabitatFetching ? (
          <HabitatFilter
            clearFn={clearValues}
            options={optionHandler(pokemonHabitat?.results as IResult[])}
            value={valueHandler(habitat)}
          />
        ) : (
          <InputSkeleton />
        )}
        {!pokemonRegionFetching ? (
          <RegionFilter
            clearFn={clearValues}
            options={optionHandler(pokemonRegion?.results as IResult[])}
            value={valueHandler(region)}
          />
        ) : (
          <InputSkeleton />
        )}
        <Button className="bg-blue-400" onClick={resetHandler}>
          Reset
        </Button>
      </div>
    </div>
  );
}
