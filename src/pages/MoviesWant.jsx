import { URL_POSTER_PATH } from '../service/movies'
import useMoviesStore from '../store/movies'
import { formatReleaseDate } from '../utils/dateFormat'
import { Button } from '@nextui-org/react'

const MoviesWant = () => {
  const moviesWant = useMoviesStore((state) => state.moviesWant)
  const removeWantMovie = useMoviesStore(
    (state) => state.removeWantMovie
  )

  const handleRemoveWantMovie = async (movie) => {
    try {
      await removeWantMovie(movie)
      alert('Película removida con exito')
      // toast.success('Película removida con exito')
    } catch (error) {
      console.log(error)
      alert('Error al remover la película')
      // toast.error('Error al remover la película')
    }
  }
  return (
    <div className="mx-auto">
      {moviesWant.length === 0
        ? (
        <h2>Todavia no agregaste películas</h2>
          )
        : (
        <ul className="grid grid-cols-1 gap-8 mt-14 sm:grid-cols-2 md:grid-cols-5 max-w-[1120px] mx-auto px-10">
          {moviesWant.map((movie) => (
            <li key={movie.id}>
              <img
                src={`${URL_POSTER_PATH}${movie.poster}`}
                alt={movie.Title}
                className='rounded-xl'
              />
              <p className="mt-2 font-bold whitespace-nowrap">
                    {movie.title.length > 22
                      ? movie.title.slice(0, 22) + '...'
                      : movie.title}
                  </p>
              <p>{formatReleaseDate(movie.year)}</p>
              <Button color='warning' onClick={() => handleRemoveWantMovie(movie)}>
                Remover
              </Button>
            </li>
          ))}
        </ul>
          )}
    </div>
  )
}

export default MoviesWant
