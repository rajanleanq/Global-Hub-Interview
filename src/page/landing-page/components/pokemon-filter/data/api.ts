import { base_url, endpoints } from "../../../../../core/constant/endpoints";

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

export const fetchPokemonGender = async (): Promise<IResponse> => {
  const response = await fetch(base_url + endpoints?.gender).then((res) =>
    res.json()
  );
  return response as IResponse;
};

export const fetchPokemonHabitat = async (): Promise<IResponse> => {
  const response = await fetch(base_url + endpoints?.habitat).then((res) =>
    res.json()
  );
  return response as IResponse;
};

export const fetchPokemonRegion = async (): Promise<IResponse> => {
  const response = await fetch(base_url + endpoints?.region).then((res) =>
    res.json()
  );
  return response as IResponse;
};

// specific filter

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
export const fetchPokemonByGender = async ({
  name,
}: IPokemonFilterBy): Promise<IPokemonFilterByGender> => {
  const response = await fetch(
    base_url +
      endpoints?.gender +
      "/" +
      name 
  ).then((res) => res.json());
  return response as IPokemonFilterByGender;
};

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

export const fetchPokemonByHabitat = async ({
  name,
}: IPokemonFilterBy): Promise<IPokemonByHabitat> => {
  const response = await fetch(
    base_url +
      endpoints?.habitat +
      "/" +
      name 
  ).then((res) => res.json());
  return response as IPokemonByHabitat;
};
