import { ReactSelect } from "../../../../../components/atom/select/select";
import { IPokemonFilterBy } from "../data/entity";
import useStore from "../../../../../store/store";
import { useMutation } from "@tanstack/react-query";
import { fetchPokemonByHabitat } from "../data/api";
import { IOptions } from "../pokemon-filter";
export default function HabitatFilter({
  options,
  value,
  clearFn,
}: {
  options: IOptions[];
  value: IOptions | null;
  clearFn: () => void;
}) {
  const { setPokemon, setPokemonDataLoading, setHabitat } = useStore();
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
    <ReactSelect
      placeholder="Filter by habitat"
      options={options}
      onChange={(e: any) => habitatChangeHandler(e?.value)}
      value={value}
    />
  );
}
