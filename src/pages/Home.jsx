import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Input } from '@nextui-org/react'
import { formatReleaseDate } from '../utils/dateFormat'
import { searchMovies } from '../api/apiCalls'
import { URL_POSTER_PATH } from '../service/movies'

const Home = () => {
  const [searchList, setSearchList] = useState([])
  const [searchText, setSearchText] = useState('')

  const handleChange = async (event) => {
    const newSearch = event.target.value
    setSearchText(newSearch)
    try {
      const response = await fetch(searchMovies(newSearch))
      const json = await response.json()

      const movies = json.results
      setSearchList(movies)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <form className="mx-auto max-w-80">
        <div className="relative">
          <Input
            variant="faded"
            color="warning"
            isClearable
            size="sm"
            type="text"
            radius="full"
            placeholder="Avengers, Matrix..."
            onChange={handleChange}
            value={searchText}
            onClear={() => {
              setSearchText('')
              setSearchList([])
            }}
            startContent={
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            }
          />
        </div>
      </form>
      {searchList.length !== 0 && (
        <ul className="grid grid-cols-1 gap-8 mt-14 sm:grid-cols-2 md:grid-cols-5 max-w-[1120px] mx-auto px-10">
          {searchList.map((movie) => {
            return (
              <li key={movie.id}>
                <Link to="/movieDetail" state={movie}>
                  <img
                    className="object-cover h-72 rounded-xl"
                    src={
                      movie.poster_path
                        ? `${URL_POSTER_PATH}${movie.poster_path}`
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
                    {formatReleaseDate(movie.release_date)}
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
// </div>
// )
// }

export default Home
