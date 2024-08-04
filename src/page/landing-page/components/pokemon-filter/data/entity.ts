//common responses
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
//gender
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

//hibitat
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

//generation
export interface IPokemonGeneration {
  abilities: Ability[]
  id: number
  main_region: MainRegion
  moves: Mfe[]
  name: string
  names: Name[]
  pokemon_species: PokemonSpecy[]
  types: any[]
  version_groups: VersionGroup[]
}

export interface Ability {
  name: string
  url: string
}

export interface MainRegion {
  name: string
  url: string
}

export interface Mfe {
  name: string
  url: string
}

export interface Name {
  language: Language
  name: string
}

export interface Language {
  name: string
  url: string
}

export interface PokemonSpecy {
  name: string
  url: string
}

export interface VersionGroup {
  name: string
  url: string
}

//region
export interface IPokemonRegionDetails {
  id: number
  locations: Location[]
  main_generation: MainGeneration
  name: string
  names: Name[]
  pokedexes: Pokedex[]
  version_groups: VersionGroup[]
}

export interface Location {
  name: string
  url: string
}

export interface MainGeneration {
  name: string
  url: string
}

export interface Name {
  language: Language
  name: string
}

export interface Language {
  name: string
  url: string
}

export interface Pokedex {
  name: string
  url: string
}

export interface VersionGroup {
  name: string
  url: string
}
