import create from "zustand";

export interface StoreState {
  gender: string | null;
  habitat: string | null;
  region: string | null;
  name: string | null;
  setGender: (payload: string) => void;
  setHabitat: (payload: string) => void;
  setRegion: (payload: string) => void;
  setName: (payload: string) => void;
}

const useStore = create<StoreState>((set) => ({
  gender: null,
  habitat: null,
  region: null,
  name: null,
  setGender: (payload) => set({ gender: payload }),
  setHabitat: (payload) => set({ habitat: payload }),
  setRegion: (payload) => set({ region: payload }),
  setName: (payload) => set({ name: payload }),
}));

export default useStore;
