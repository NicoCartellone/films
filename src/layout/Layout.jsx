import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import PropTypes from 'prop-types'
import { Toaster } from 'sonner'

const Layout = ({ children }) => {
  return (
    <div className="relative flex flex-col min-h-screen mx-0">
      <div
        className="absolute top-0 bottom-0 z-[-2] min-h-screen w-full bg-neutral-100 dark:bg-neutral-950
        bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(217,216,255,0.5),rgba(255,255,255,0.9))]
        dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(80,80,80,0.3),rgba(255,255,255,0))]"
      ></div>
      <Toaster position='top-right' richColors/>
      <Header />
      {children}
      <Footer />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
