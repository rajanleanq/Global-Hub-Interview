import create from "zustand";
import { IPokemonResult } from "../page/landing-page/data/entity";

export interface StoreState {
  pokemons: IPokemonResult[] | null;
  gender: string | null;
  habitat: string | null;
  region: string | null;
  name: string | null;
  pokemonDataLoading: boolean;
  setGender: (payload: string | null) => void;
  setHabitat: (payload: string | null) => void;
  setRegion: (payload: string | null) => void;
  setName: (payload: string | null) => void;
  setPokemon: (payload: IPokemonResult[]) => void;
  setPokemonDataLoading: (payload: boolean) => void;
}

const useStore = create<StoreState>((set) => ({
  gender: null,
  habitat: null,
  region: null,
  name: null,
  pokemons: null,
  pokemonDataLoading: false,
  setPokemon: (payload) => set({ pokemons: payload }),
  setGender: (payload) => set({ gender: payload }),
  setHabitat: (payload) => set({ habitat: payload }),
  setRegion: (payload) => set({ region: payload }),
  setName: (payload) => set({ name: payload }),
  setPokemonDataLoading: (payload) => set({ pokemonDataLoading: payload }),
}));

export default useStore;
