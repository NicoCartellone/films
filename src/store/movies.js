import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useMoviesStore = create(
  persist((set) => ({
    moviesWant: [],
    moviesWatched: [],
    addWantmovie: (movie) =>
      set((state) => (
        { moviesWant: [...state.moviesWant, movie] })),
    addWatchedMovie: (movie) =>
      set((state) => (
        { moviesWatched: [...state.moviesWatched, movie] })
      ),
    removeWatchedMovie: (movie) =>
      set((state) => ({
        moviesWatched: state.moviesWatched.filter((m) => m.id !== movie.id)
      })),
    moveWantToWatched: (movie) => {
      set((state) => ({
        moviesWatched: [...state.moviesWatched, movie]
      }))
      set((state) => ({
        moviesWant: state.moviesWant.filter((m) => m.id !== movie.id)
      }))
    },
    removeWantMovie: (movie) =>
      set((state) => ({
        moviesWant: state.moviesWant.filter((m) => m.id !== movie.id)
      })),
    moveWatchedToWant: (movie) => {
      set((state) => ({
        moviesWant: [...state.moviesWant, movie]
      }))
      set((state) => ({
        moviesWatched: state.moviesWatched.filter((m) => m.id !== movie.id)
      }))
    }
  }), {
    name: 'moviesWantStore'
  })
)

export default useMoviesStore
