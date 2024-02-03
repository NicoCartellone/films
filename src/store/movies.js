import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useMoviesStore = create(
  persist((set) => ({
    moviesWant: [],
    addWantmovie: (movie) =>
      set((state) => (
        { moviesWant: [...state.moviesWant, movie] })),
    removeWantMovie: (movie) =>
      set((state) => ({
        moviesWant: state.moviesWant.filter((m) => m.id !== movie.id)
      }))
  }), {
    name: 'moviesWantStore'
  })
)

export default useMoviesStore
