export const base_url = "https://pokeapi.co/api/v2/";
export const image_base_url = (id: string | number) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${id}.png`;
export interface IPokemonPagination {
  limit: number;
  offset: number;
}
export const endpoints = {
  pokemons: ({ limit, offset }: IPokemonPagination) =>
    `pokemon?limit=${limit}&offset=${offset}`,
  detail_page: (type: string) => `pokemon/` + type,
  gender: "gender",
  habitat: "pokemon-habitat",
  region: "region",
};
