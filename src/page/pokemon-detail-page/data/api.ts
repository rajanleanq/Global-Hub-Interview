import { base_url, endpoints } from "../../../core/constant/endpoints";
import { IPokemonFilterBy } from "../../landing-page/components/pokemon-filter/data/entity";
import { IPokemonDetail, IPokemonEvolution, IPokemonSpecies } from "./entity";

export const fetchPokemonDetails = async ({
  name,
}: IPokemonFilterBy): Promise<IPokemonDetail> => {
  const response = await fetch(base_url + endpoints?.detail_page(name)).then(
    (res) => res.json()
  );
  return response as IPokemonDetail;
};

export const fetchPokemonEvolutionChain = async ({
  name,
}: IPokemonFilterBy): Promise<IPokemonEvolution> => {
  const response = await fetch(
    base_url + endpoints?.pokemon_evolution_chain(name)
  ).then((res) => res.json());
  return response as IPokemonEvolution;
};

export const fetchPokemonSpeciesDetail = async ({
  name,
}: IPokemonFilterBy): Promise<IPokemonSpecies> => {
  const response = await fetch(
    base_url + endpoints?.pokemon_species(name)
  ).then((res) => res.json());
  return response as IPokemonSpecies;
};
