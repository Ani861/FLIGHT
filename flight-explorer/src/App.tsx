import './App.css'
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import { FiHome, FiStar } from 'react-icons/fi'
import Home from './pages/Home'
import Watchlist from './pages/Watchlist'
import { WatchlistProvider } from './context/WatchlistContext'
import Footer from './components/Footer'

export default function App() {
  return (
    <WatchlistProvider>
      <Router>
        <div>
          <nav className="topbar">
            <div className="container topbar-inner stacked">
              <div className="topbar-title">The Flight Explorer</div>
              <div className="topbar-nav">
                <NavLink to="/" end className={({ isActive }) => isActive ? 'topbar-link active' : 'topbar-link'}>
                  <FiHome className="icon" aria-hidden="true" /> Home
                </NavLink>
                <NavLink to="/watchlist" className={({ isActive }) => isActive ? 'topbar-link active' : 'topbar-link'}>
                  <FiStar className="icon" aria-hidden="true" /> Watchlist
                </NavLink>
              </div>
            </div>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/watchlist" element={<Watchlist />} />
          </Routes>

          <Footer />
        </div>
      </Router>
    </WatchlistProvider>
  )
}
