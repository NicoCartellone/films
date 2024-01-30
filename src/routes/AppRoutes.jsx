import {
  MovieDetail,
  MoviesWant,
  MoviesWatched,
  Home,
  NotFound
} from '../pages/index'
import Layout from '../layout/Layout'
import TabsMovies from '../components/tabs/TabsMovies'
import { Routes, Route } from 'react-router-dom'

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas con TabsMovies */}
      <Route
        path="/"
        element={
          <Layout>
            <TabsMovies />
            <Home />
          </Layout>
        }
      />
      <Route
        path="/moviesWant"
        element={
          <Layout>
            <TabsMovies />
            <MoviesWant />
          </Layout>
        }
      />
      <Route
        path="/moviesWatched"
        element={
          <Layout>
            <TabsMovies />
            <MoviesWatched />
          </Layout>
        }
      />

      {/* Ruta sin TabsMovies */}
      <Route
        path="/movieDetail"
        element={<Layout><MovieDetail /></Layout>}
      />

      {/* Ruta NotFound */}
      <Route
        path="*"
        element={<Layout><NotFound /></Layout>}
      />
    </Routes>
  )
}

export default AppRoutes
