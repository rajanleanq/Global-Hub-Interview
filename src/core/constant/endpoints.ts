export const base_url = "https://pokeapi.co/api/v2/";

//img base url for pokemon cards
export const image_base_url = (id: string | number) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${id}.png`;


export interface IPokemonPagination {
  limit: number;
  offset: number;
}
//endpoints for api
export const endpoints = {
  pokemons: ({ limit, offset }: IPokemonPagination) =>
    `pokemon?limit=${limit}&offset=${offset}`,
  detail_page: (type: string) => `pokemon/` + type,
  gender: "gender",
  habitat: "pokemon-habitat",
  region: "region",
  generation: (id: number | string) => `generation/${id}`,
  pokemon_species: (name: string) => `pokemon-species/${name}`,
  pokemon_evolution_chain: (name: string) => `evolution-chain/${name}`,
};
