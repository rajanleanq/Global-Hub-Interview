import { base_url, endpoints } from "../../../../../core/constant/endpoints";
import {
  IPokemonByHabitat,
  IPokemonFilterBy,
  IPokemonFilterByGender,
  IPokemonGeneration,
  IPokemonRegionDetails,
  IResponse,
} from "./entity";
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
export const fetchPokemonMainGeneration = async (id: string | number):Promise<IPokemonGeneration> => {
  const response = await fetch(base_url + endpoints?.generation(id)).then(
    (res) => res.json()
  );
  return response as IPokemonGeneration;
};
export const fetchPokemonRegionDetail = async (id: string | number):Promise<IPokemonRegionDetails> => {
  const response = await fetch(base_url + endpoints?.region + "/" + id).then(
    (res) => res.json()
  );
  return response as IPokemonRegionDetails;
};
// specific filter
export const fetchPokemonByGender = async ({
  name,
}: IPokemonFilterBy): Promise<IPokemonFilterByGender> => {
  const response = await fetch(base_url + endpoints?.gender + "/" + name).then(
    (res) => res.json()
  );
  return response as IPokemonFilterByGender;
};

export const fetchPokemonByHabitat = async ({
  name,
}: IPokemonFilterBy): Promise<IPokemonByHabitat> => {
  const response = await fetch(base_url + endpoints?.habitat + "/" + name).then(
    (res) => res.json()
  );
  return response as IPokemonByHabitat;
};
