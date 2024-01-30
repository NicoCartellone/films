import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Tabs, Tab } from '@nextui-org/react'

const TabsMovies = () => {
  const [selected, setSelected] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (selected === 'search') {
      navigate('/')
    } else if (selected === 'moviesWant') {
      navigate('/moviesWant')
    } else if (selected === 'moviesWatched') {
      navigate('/moviesWatched')
    }
  }, [selected, navigate])

  return (
      <Tabs
        className='mx-auto my-5'
        aria-label="Options"
        onSelectionChange={setSelected}
        selectedKey={selected}
        variant="solid"
        color="warning"
        radius="full"
        size="lg"
      >
        <Tab key="search" title="Buscar película" />
        <Tab key="moviesWant" title="Quiero ver" />
        <Tab key="moviesWatched" title="Vistas" />
      </Tabs>
  )
}

export default TabsMovies
