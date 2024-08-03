export interface IResponse {
  count: number;
  next: any;
  previous: any;
  results: IResult[];
}

export interface IResult {
  name: string;
  url: string;
}

export interface IPokemonFilterByGender {
  id: number;
  name: string;
  pokemon_species_details: PokemonSpeciesDetail[];
  required_for_evolution: RequiredForEvolution[];
}

export interface PokemonSpeciesDetail {
  pokemon_species: PokemonSpecies;
  rate: number;
}

export interface PokemonSpecies {
  name: string;
  url: string;
}

export interface RequiredForEvolution {
  name: string;
  url: string;
}

export interface IPokemonFilterBy {
  name: string;
}

export interface IPokemonByHabitat {
  id: number;
  name: string;
  names: Name[];
  pokemon_species: PokemonSpecies[];
}

export interface Name {
  language: Language;
  name: string;
}

export interface Language {
  name: string;
  url: string;
}

export interface PokemonSpecies {
  name: string;
  url: string;
}
