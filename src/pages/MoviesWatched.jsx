import { URL_POSTER_PATH } from '../service/movies'
import useMoviesStore from '../store/movies'
import { formatReleaseDate } from '../utils/dateFormat'
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from '@nextui-org/react'
import MoreIcon from '../components/icons/MoreIcon'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

const MoviesWatched = () => {
  const moviesWatched = useMoviesStore((state) => state.moviesWatched)
  const removeWatchedMovie = useMoviesStore((state) => state.removeWatchedMovie)
  const moveMovieToWant = useMoviesStore((state) => state.moveWatchedToWant)

  const handleremoveWatchedMovie = async (movie) => {
    try {
      await removeWatchedMovie(movie)
      // alert('Película removida con exito')
      toast.success('Película removida con exito')
    } catch (error) {
      console.log(error)
      // alert('Error al remover la película')
      toast.error('Error al remover la película')
    }
  }

  const haddleMoveMovieToWant = (movie) => {
    moveMovieToWant(movie)
  }

  return (
      <div className="mx-auto">
        {moviesWatched.length === 0
          ? (
          <h2>Todavia no agregaste películas</h2>
            )
          : (
          <ul className="grid grid-cols-1 gap-8 mt-14 sm:grid-cols-2 md:grid-cols-5 max-w-[1120px] mx-auto px-10">
            {moviesWatched.map((movie) => (
              <li key={movie.id}>
                <div className="relative">
                <Link to="/movieDetail" state={movie}>
                  <img
                    src={`${URL_POSTER_PATH}${movie.poster}`}
                    alt={movie.Title}
                    className="object-cover transition-all rounded-xl hover:scale-105"
                  />
                   </Link>
                  <Dropdown placement="bottom-end" backdrop="blur">
                    <DropdownTrigger>
                      <Button
                        isIconOnly
                        radius="full"
                        color="warning"
                        className="absolute bottom-2 right-2"
                      >
                        <MoreIcon />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu color='warning'>
                      <DropdownItem key="remove" onClick={() => handleremoveWatchedMovie(movie)}>Quitar</DropdownItem>
                      <DropdownItem key="movetowatched" onClick={() => haddleMoveMovieToWant(movie)}>Mover a quiero ver</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
                <p className="mt-2 font-bold whitespace-nowrap">
                  {movie.title.length > 22
                    ? movie.title.slice(0, 22) + '...'
                    : movie.title}
                </p>
                <p className="text-gray-400">{formatReleaseDate(movie.year)}</p>
              </li>
            ))}
          </ul>
            )}
      </div>
  )
}

export default MoviesWatched
