import { ReactSelect } from "../../../../../components/atom/select/select";
import { IPokemonFilterBy, IResult } from "../data/entity";
import useStore from "../../../../../store/store";
import { useMutation } from "@tanstack/react-query";
import { fetchPokemonByGender } from "../data/api";
import { IOptions } from "../pokemon-filter";
export default function GenderFilter({
  options,
  value,
  clearFn,
}: {
  options: IOptions[];
  value: IOptions | null;
  clearFn: () => void;
}) {
  const { setPokemon, setPokemonDataLoading, setGender } = useStore();
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
    <ReactSelect
      placeholder="Filter by habitat"
      options={options}
      onChange={(e: any) => genderChangeHandler(e?.value)}
      value={value}
    />
  );
}
