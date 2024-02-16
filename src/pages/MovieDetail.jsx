import { useLocation } from 'react-router-dom'
import { Button } from '@nextui-org/react'
import { formatReleaseDate } from '../utils/dateFormat'
import useMoviesStore from '../store/movies'
import { toast } from 'sonner'

const MovieDetail = () => {
  const movieData = useLocation().state

  const addWantmovie = useMoviesStore((state) => state.addWantmovie)
  const moviesWant = useMoviesStore((state) => state.moviesWant)

  const addWatchedmovie = useMoviesStore((state) => state.addWatchedMovie)
  const moviesWatched = useMoviesStore((state) => state.moviesWatched)

  const handleWantMovie = async (movie) => {
    const movieWantExist = moviesWant.find((m) => m.id === movie.id)
    const movieWatchedExist = moviesWatched.find((m) => m.id === movie.id)
    if (!movieWantExist && !movieWatchedExist) {
      await addWantmovie(movie)
      toast.success('Película guardada con exito')
    } else {
      toast.error('Película ya guardada')
    }
  }

  const handleWatchedMovie = async (movie) => {
    const movieWantExist = moviesWant.find((m) => m.id === movie.id)
    const movieWatchedExist = moviesWatched.find((m) => m.id === movie.id)
    if (!movieWantExist && !movieWatchedExist) {
      await addWatchedmovie(movie)
      toast.success('Película guardada con exito')
    } else {
      toast.error('Película ya guardada')
    }
  }

  return (
    <div className="p-5 mx-auto my-auto text-center lg:text-left">
      <div className="lg:flex lg:gap-24">
        <img
          className="object-contain p-5 rounded-3xl"
          src={
            movieData.poster
              ? `https://image.tmdb.org/t/p/w500/${movieData.poster}`
              : 'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM='
          }
          alt={movieData.title}
          width={400}
          height={300}
        />
        <div className="lg:gap-2 lg:flex-col lg:flex">
          <p className="text-3xl font-bold">{movieData.title}</p>
          <p className="text-xl text-gray-400">
            {formatReleaseDate(movieData.year)}
          </p>
          <p className="text-lg max-w-[500px] text-balance leading-relaxed mt-10">
            {movieData.overview}
          </p>
          <div className="lg:flex lg:gap-2">
            <Button color="warning" className="mt-10 w-52" onClick={() => handleWantMovie(movieData)}>
              Quiero ver
            </Button>
            <Button color="warning" className="mt-10 w-52" onClick={() => handleWatchedMovie(movieData)}>
              Vista
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetail
