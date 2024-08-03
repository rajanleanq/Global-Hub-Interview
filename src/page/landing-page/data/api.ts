import {
  IPokemonPagination,
  base_url,
  endpoints,
} from "../../../core/constant/endpoints";
import { IPokemonData } from "./entity";

export const fetchPokemon = async ({ limit, offset }: IPokemonPagination):Promise<IPokemonData> => {
  const response = await fetch(
    base_url + endpoints?.pokemons({ limit, offset })
  ).then((res) => res.json());
  return response as IPokemonData;
};
