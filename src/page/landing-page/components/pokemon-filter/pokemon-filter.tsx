import SearchInput from "../../../../components/atom/input/search-input/search-input";
import { ReactSelect } from "../../../../components/atom/select/select";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchPokemonByGender,
  fetchPokemonByHabitat,
  fetchPokemonGender,
  fetchPokemonHabitat,
  fetchPokemonRegion,
} from "./data/api";
import useStore from "../../../../store/store";
import { ChangeEvent, FormEvent, useEffect } from "react";
import InputSkeleton from "../../../../components/molecule/skeleton/input-skeleton";
import useDebounce from "../../../../core/hooks/use-debounce";
import { fetchPokemon } from "../../data/api";
import { IPokemonFilterBy, IResult } from "./data/entity";
import { IPokemonResult } from "../../data/entity";

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
    setPokemon,
    pokemons,
  } = useStore();
  const { data: pokemonData } = useQuery({
    queryKey: ["pokemon"],
    queryFn: async () => await fetchPokemon({ limit: 1000, offset: 0 }),
  });
  const debouncedSearchTerm = useDebounce(name, 500);
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
  const searchConditions = () => {
    if (pokemons) {
      if (name && name?.length > 1) {
        const result = pokemons.filter((pokemon: any) =>
          pokemon.name.toLowerCase().includes(name.toLowerCase())
        );
        setPokemon(result);
      } else {
        setPokemon(pokemonData?.results as IPokemonResult[]);
      }
    }
  };
  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    searchConditions();
  };
  useEffect(() => {
    if (debouncedSearchTerm) {
      searchConditions();
    }
  }, [debouncedSearchTerm,name]);

  return (
    <div className="min-w-[300px] border-r p-4  relative xs:hidden md:block">
      <div className="w-[266px] fixed flex flex-col gap-6">
        <form onSubmit={handleSearch}>
          <SearchInput
            placeHolder="Search pokemon by name"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            value={name || ""}
          />
        </form>

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
      </div>
    </div>
  );
}
