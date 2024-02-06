import { useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Input } from '@nextui-org/react'
import { formatReleaseDate } from '../utils/dateFormat'
import { URL_POSTER_PATH } from '../service/movies'
import debounce from 'just-debounce-it'
import { useMovies } from '../hooks/useMovies'
import { useSearch } from '../hooks/useSearch'
import { SearchIcon } from '../components/icons/SearchIcon'

const Home = () => {
  const { search, updateSearch, error } = useSearch()
  const { movies, getMovies, loading, setMovies } = useMovies({ search })

  useEffect(() => {
    getMovies({ search: 'avengers' })
  }, [getMovies])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedGetMovies = useCallback(
    debounce((search) => {
      getMovies({ search })
    }, 300),
    [getMovies]
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  return (
    <div>
      <form className="mx-auto max-w-80" onSubmit={handleSubmit}>
          <Input
            variant="faded"
            color="warning"
            isClearable
            size="sm"
            type="text"
            radius="full"
            placeholder="Avengers, Matrix..."
            onChange={handleChange}
            value={search}
            onClear={() => {
              updateSearch('')
              setMovies([])
            }}
            startContent={
              <SearchIcon className="text-gray-500 dark:text-gray-400" />
            }
          />
      </form>
      {error && <p className="mt-10 text-center text-red-600">{error}</p>}
      <div className='mx-auto'>

      {movies?.length > 0
        ? (
        <ul className="grid grid-cols-1 gap-8 mt-14 sm:grid-cols-2 md:grid-cols-5 max-w-[1120px] mx-auto px-10">
          {movies.map((movie) => {
            return (
              <li key={movie.id}>
                <Link to="/movieDetail" state={movie}>
                  <img
                    className="object-cover transition-all rounded-xl hover:scale-105"
                    src={
                      movie.poster
                        ? `${URL_POSTER_PATH}${movie.poster}`
                        : 'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM='
                    }
                    alt={movie.title}
                  />
                </Link>
                <div>
                  <p className="mt-2 font-bold whitespace-nowrap">
                    {movie.title.length > 22
                      ? movie.title.slice(0, 22) + '...'
                      : movie.title}
                  </p>
                  <p className="text-gray-400">
                    {formatReleaseDate(movie.year)}
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
          )
        : (
        <p className="mt-10 text-center">
          No se encontraron peliculas para esta busqueda
        </p>
          )}
      </div>
    </div>
  )
}

export default Home
