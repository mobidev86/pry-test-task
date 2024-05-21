import { create } from "zustand";

const useStore = create((set, get) => ({
  suggestions: [],
  overallAnswer: 0,
  total: null,

  setSuggestions: (suggestions) => set(() => ({ suggestions })),
  setTotal: (total) => set(() => ({ total })),
}));

export default useStore;
