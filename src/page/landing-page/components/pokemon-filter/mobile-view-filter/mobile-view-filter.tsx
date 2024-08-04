import { useQuery } from "@tanstack/react-query";
import SearchInput from "../../../../../components/atom/input/search-input/search-input";
import useStore from "../../../../../store/store";
import {fetchPokemon } from "../../../data/api";
import useDebounce from "../../../../../core/hooks/use-debounce";
import { ChangeEvent, FormEvent, useEffect } from "react";
import { IPokemonResult } from "../../../data/entity";

export default function MobileViewFilter() {
  const { setName, name, setPokemon, pokemons } = useStore();
  const { data: pokemonData } = useQuery({
    queryKey: ["pokemon"],
    queryFn: async () => await fetchPokemon({ limit: 1000, offset: 0 }),
  });
  const debouncedSearchTerm = useDebounce(name, 500);
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
  }, [debouncedSearchTerm, name]);

  return (
    <form onSubmit={handleSearch} className="w-full">
      <SearchInput
      onClear={() => setName("")}
        placeHolder="Search pokemon by name"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        value={name || ""}
      />
    </form>
  );
}
