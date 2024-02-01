import { useLocation } from 'react-router-dom'
import { Button } from '@nextui-org/react'
import { formatReleaseDate } from '../utils/dateFormat'

const MovieDetail = () => {
  const { state } = useLocation()

  return (
    <div className="mx-auto my-auto">
      <div className="flex gap-24">
        <img
          className="object-contain rounded-xl"
          src={
            state.poster_path
              ? `https://image.tmdb.org/t/p/w500/${state.poster_path}`
              : 'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM='
          }
          alt={state.title}
          width={400}
          height={300}
        />
        <div className="flex flex-col gap-2">
          <p className="text-3xl font-bold">{state.title}</p>
          <p className="text-xl text-gray-400">
            {formatReleaseDate(state.release_date)}
          </p>
          <p className="text-lg max-w-[500px] text-balance leading-relaxed mt-10">
            {state.overview}
          </p>
          <div className="flex gap-2">
            <Button color="warning" className="mt-10 font-bold w-52">
              Quiero ver
            </Button>
            <Button color="warning" className="mt-10 font-bold w-52">
              Vista
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetail
