import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Input } from '@nextui-org/react'

const Home = () => {
  const [seartList, setSearchList] = useState([])
  const [searchText, setSearchText] = useState('')

  const handleChange = async (event) => {
    const newSearch = event.target.value
    setSearchText(newSearch)
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=8768ef9f777f98f69145251c92ae63f0&query=${newSearch}&language=es-ES&page=1&include_adult=false`
      )
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
            size='sm'
            type="text"
            radius='full'
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
      {seartList.length !== 0 && (
        <div className="grid grid-cols-2 gap-4 mt-4">
          {seartList.map((movie) => {
            return (
              <div key={movie.id}>
                <div className="flex flex-col items-center justify-center w-full h-full overflow-hidden shadow-lg rounded-lg dark:bg-[#141414]">
                  <Link to="/movieDetail">
                    <img
                      className="object-cover w-full h-48"
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt={movie.title}
                    />
                  </Link>
                  <div className="flex flex-col items-center justify-center w-full h-full p-6">
                    <h2 className="mt-4 mb-4 text-xl font-medium text-center text-gray-800 dark:text-white">
                      {movie.title}
                    </h2>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Home
