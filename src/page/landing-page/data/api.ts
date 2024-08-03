import {
  IPokemonPagination,
  base_url,
  endpoints,
} from "../../../constant/endpoints";

export interface IPokemonData {
  count: number
  next: string
  previous: any
  results: IPokemonResult[]
}

export interface IPokemonResult {
  name: string
  url: string
}

export const fetchPokemon = async ({ limit, offset }: IPokemonPagination):Promise<IPokemonData> => {
  const response = await fetch(
    base_url + endpoints?.pokemons({ limit, offset })
  ).then((res) => res.json());
  return response as IPokemonData;
};
