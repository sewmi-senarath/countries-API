import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import SearchBar from './components/SearchBar';
import FilterDropdown from './components/FilterDropdown';
import CountryDetail from './components/CountryDetails';
import Favorites from './components/Favorites';
import MapView from './components/MapView';
import CompareCountries from './components/CompareCountries';
import CountryList from './components/CountryList';
import Login from './components/Login';
import api from './utils/axios';
import './App.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

// ProtectedRoute component to handle redirects for unauthenticated users
const ProtectedRoute = ({ isAuthenticated, children }) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated && window.location.pathname !== '/login') {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
};

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    return savedTheme;
  });
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) || []
  );
  const [compareList, setCompareList] = useState([]);
  const [isMapView, setIsMapView] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check authentication status on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const isLoginPage = window.location.pathname === '/login';
  
    if (token) {
      api.get('/api/protected')
        .then(() => {
          setIsAuthenticated(true);
          if (isLoginPage) {
            navigate('/', { replace: true });
          }
        })
        .catch(() => {
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          if (!isLoginPage) {
            navigate('/login', { replace: true });
          }
        });
    } else if (!isLoginPage) {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => {
        setCountries(response.data);
        setFilteredCountries(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching countries:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const toggleFavorite = (country) => {
    if (!isAuthenticated) {
      console.error('Please log in to manage favorites');
      return;
    }
    setFavorites((prev) =>
      prev.some((fav) => fav.cca2 === country.cca2)
        ? prev.filter((fav) => fav.cca2 !== country.cca2)
        : [...prev, country]
    );
  };

  const toggleCompare = (country) => {
    setCompareList((prev) =>
      prev.some((c) => c.cca2 === country.cca2)
        ? prev.filter((c) => c.cca2 !== country.cca2)
        : prev.length < 3 ? [...prev, country] : prev
    );
  };

  const handleSearch = (query) => {
    if (!query) {
      setFilteredCountries(countries);
      return;
    }

    axios
      .get(`https://restcountries.com/v3.1/name/${query}`)
      .then((response) => {
        setFilteredCountries(response.data);
      })
      .catch(() => {
        setFilteredCountries([]);
      });
  };

  const handleFilters = ({ region, language }) => {
    let filtered = [...countries];

    if (region !== 'All') {
      filtered = filtered.filter(country => country.region === region);
    }

    if (language !== 'All') {
      filtered = filtered.filter(country => {
        const countryLanguages = Object.values(country.languages || {});
        return countryLanguages.some(lang =>
          lang.toLowerCase().includes(language.toLowerCase())
        );
      });
    }

    setFilteredCountries(filtered);
  };

  const handleLogout = async () => {
    try {
      await api.delete('/api/auth/logout');
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      toast.success('Successfully logged out!');
      navigate(
        '/login', 
        { replace: true }
      );
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Logout failed. Please try again.');
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      navigate(
        '/login', 
        { replace: true }
      );
    }
  };

  return (
    <div className="container mx-auto px-4">
      {/* Enhanced Navigation */}
      <nav className="relative isolate mb-8 rounded-2xl overflow-hidden shadow-2xl">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/earth-bg.jpg')] bg-cover bg-center opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-indigo-900/80 to-purple-900/90" />
          
          {/* Floating Particles Animation */}
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/10 animate-float"
              style={{
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 20 + 10}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
  
        {/* Glassmorphism Effect Layer */}
        <div className="relative backdrop-blur-md bg-white/5 border-b border-white/10">
          <div className="container mx-auto px-6 py-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              {/* Logo/Brand with Hover Effect */}
              <Link
                to="/"
                className="flex items-center space-x-4 group transform transition-all duration-500 hover:scale-105"
              >
                <div className="relative w-14 h-14 rounded-full overflow-hidden shadow-xl border-2 border-white/30 group-hover:border-blue-300 transition-all duration-300">
                  <img
                    src="/earth.jpg"
                    alt="Earth Icon"
                    className="w-full h-full object-cover transform group-hover:rotate-12 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-blue-400/10 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-300" />
                </div>
                <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-200 to-white tracking-wide">
                  COUNTRY EXPLORER
                </span>
              </Link>
  
              {/* Navigation Links */}
              <div className="flex items-center space-x-6 mt-4 md:mt-0">
                <div className="hidden md:flex items-center space-x-6">
                  <Link
                    to="/"
                    className="relative px-3 py-2 text-white/90 hover:text-white transition-all group"
                  >
                    <span className="relative z-10 flex items-center space-x-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      <span>Home</span>
                    </span>
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </Link>
  
                  <Link
                    to="/favorites"
                    className="relative px-3 py-2 text-white/90 hover:text-white transition-all group"
                  >
                    <span className="relative z-10 flex items-center space-x-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <span>Favorites</span>
                    </span>
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </Link>
                </div>
  
                {/* Auth Buttons */}
                {isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2.5 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl hover:from-red-600 hover:to-pink-700 group relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center space-x-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span>Logout</span>
                    </span>
                    <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="px-4 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-purple-700 group relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center space-x-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      <span>Login</span>
                    </span>
                    <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                )}
  
                {/* Theme Toggle - Enhanced */}
                <button
                  onClick={toggleTheme}
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl relative overflow-hidden"
                  aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                >
                  <span className="relative z-10">
                    {theme === 'light' ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    )}
                  </span>
                  <span className="absolute inset-0 bg-white/5 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <>
                <div className="flex flex-col md:flex-row md:space-x-4 mb-6 items-center">
                  <div className="w-full md:w-2/3">
                    <SearchBar
                      onSearch={handleSearch}
                      countries={countries}
                      onViewChange={setIsMapView}
                      isMapView={isMapView}
                    />
                  </div>
                  <div className="w-full md:w-1/3">
                    <FilterDropdown onFiltersChange={handleFilters} />
                  </div>
                </div>

                <CompareCountries compareList={compareList} toggleCompare={toggleCompare} />

                {isMapView ? (
                  <div className="h-[600px] w-full">
                    <MapView countries={filteredCountries} />
                  </div>
                ) : (
                  <CountryList
                    countries={filteredCountries}
                    loading={loading}
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                    compareList={compareList}
                    toggleCompare={toggleCompare}
                  />
                )}
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/country/:code"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <CountryDetail favorites={favorites} toggleFavorite={toggleFavorite} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/favorites"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Favorites favorites={favorites} toggleFavorite={toggleFavorite} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="*"
          element={<div className="text-center text-red-500">Page not found</div>}
        />
      </Routes>

       <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />


    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}