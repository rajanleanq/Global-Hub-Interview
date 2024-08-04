import { ReactSelect } from "../../../../../components/atom/select/select";
import useStore from "../../../../../store/store";
import { useMutation } from "@tanstack/react-query";
import {
  fetchPokemonMainGeneration,
  fetchPokemonRegionDetail,
} from "../data/api";
import { getIdFromUrl } from "../../../../../core/lib/utils";
import { IOptions } from "../pokemon-filter";
export default function RegionFilter({
  options,
  value,
  clearFn,
}: {
  options: IOptions[];
  value: IOptions | null;
  clearFn: () => void;
}) {
  const { setPokemon, setPokemonDataLoading, setRegion } = useStore();
  const pokemonRegionMutation = useMutation({
    mutationFn: async (id: string | number) =>
      await fetchPokemonRegionDetail(id),
    mutationKey: ["pokemon-region"],
  });
  const pokemonGenerationMutation = useMutation({
    mutationFn: async (id: string | number) =>
      await fetchPokemonMainGeneration(id),
    mutationKey: ["pokemon-generation"],
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
    <ReactSelect
      placeholder="Filter by habitat"
      options={options}
      onChange={(e: any) => regionChangeHandler(e?.value)}
      value={value}
    />
  );
}
