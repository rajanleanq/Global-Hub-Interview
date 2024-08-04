import { ChangeEvent, FormEvent, useEffect } from "react";
import useStore from "../../../../../store/store";
import useDebounce from "../../../../../core/hooks/use-debounce";
import { IPokemonData } from "../../../data/entity";
import SearchInput from "../../../../../components/atom/input/search-input/search-input";

const SearchInputFilter = ({
  pokemonData,
}: {
  pokemonData: IPokemonData;
}) => {
  const { name, setName, pokemons, setPokemon } = useStore();
  const debouncedSearchTerm = useDebounce(name, 500);

  const searchConditions = () => {
    if (pokemons) {
      if (name && name?.length > 1) {
        const result = pokemons.filter((pokemon: any) =>
          pokemon.name.toLowerCase().includes(name.toLowerCase())
        );
        setPokemon(result);
      } else {
        setPokemon(pokemonData?.results);
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
    <form onSubmit={handleSearch}>
      <SearchInput
        placeHolder="Search pokemon by name"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        value={name || ""}
      />
    </form>
  );
};

export default SearchInputFilter;
