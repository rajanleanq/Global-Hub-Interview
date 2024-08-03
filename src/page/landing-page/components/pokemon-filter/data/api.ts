import { base_url, endpoints } from "../../../../../constant/endpoints";

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

export const fetchPokemonHabitat = async ():Promise<IResponse> => {
  const response = await fetch(base_url + endpoints?.habitat).then((res) =>
    res.json()
  );
  return response as IResponse;
};

export const fetchPokemonRegion = async ():Promise<IResponse> => {
  const response = await fetch(base_url + endpoints?.region).then((res) =>
    res.json()
  );
  return response as IResponse;
};
