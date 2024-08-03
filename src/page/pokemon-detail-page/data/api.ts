import {
    base_url,
    endpoints,
  } from "../../../core/constant/endpoints";
import { IPokemonFilterBy } from "../../landing-page/components/pokemon-filter/data/entity";
import { IPokemonDetail } from "./entity";

  export const fetchPokemonDetails = async ({name}:IPokemonFilterBy):Promise<IPokemonDetail> => {
    const response = await fetch(
      base_url + endpoints?.pokemons+'/'+name
    ).then((res) => res.json());
    return response as IPokemonDetail;
  };
  