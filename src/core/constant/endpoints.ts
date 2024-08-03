export const base_url = "https://pokeapi.co/api/v2/";
export interface IPokemonPagination {
    limit: number;
    offset: number;
}
export const endpoints = {
  pokemons:({limit,offset}:IPokemonPagination) => `pokemon?limit=${limit}&offset=${offset}`,
  detail_page: (type: string) => `pokemon/` + type,
  gender:"gender",
  habitat:"pokemon-habitat",
  region:"region",
};
