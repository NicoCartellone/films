const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const apiBaseUrl = 'https://api.themoviedb.org/3'

export const nowPlaying = `${apiBaseUrl}/movie/now_playing?api_key=${API_KEY}&language=es-ES&page=1&include_adult=false`
export const popular = `${apiBaseUrl}/movie/popular?api_key=${API_KEY}&language=es-ES&page=1&include_adult=false`
export const topRated = `${apiBaseUrl}/movie/top_rated?api_key=${API_KEY}&language=es-ES&page=1&include_adult=false`
export const trending = `${apiBaseUrl}/trending/movie/day?api_key=${API_KEY}&language=es-ES&page=1&include_adult=false`

export const searchMovies = (keyword) => {
  return `${apiBaseUrl}/search/movie?api_key=${API_KEY}&query=${keyword}&language=es-ES&page=1&include_adult=false`
}

export const image500 = (posterPath) => 'https://image.tmdb.org/t/p/w500' + posterPath
export const image342 = (posterPath) => 'https://image.tmdb.org/t/p/w342' + posterPath
export const image185 = (posterPath) => 'https://image.tmdb.org/t/p/w185' + posterPath
