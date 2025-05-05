import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import FilterDropdown from './components/FilterDropdown';
import CountryDetail from './components/CountryDetails';
import Favorites from './components/Favorites';
import MapView from './components/MapView';
import CompareCountries from './components/CompareCountries';
import CountryList from './components/CountryList';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) || []
  );
  const [compareList, setCompareList] = useState([]);
  const [isMapView, setIsMapView] = useState(false);

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
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const toggleFavorite = (country) => {
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

    // Apply region filter
    if (region !== 'All') {
      filtered = filtered.filter(country => country.region === region);
    }

    // Apply language filter
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

  return (
    <Router>
      <div className="container mx-auto mt-6 px-4">
        <nav className="flex justify-between items-center p-6 rounded-xl shadow-lg mb-8 relative overflow-hidden">
          {/* Background Image with Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: 'url(/earth-bg.jpg)', // Add this image to your public folder
              filter: 'brightness(0.9)'
            }}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 via-blue-500/80 to-indigo-500/80" />

          {/* Content */}
          <div className="relative flex justify-between items-center w-full">
            <Link
              to="/"
              className="flex items-center space-x-4 group"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden shadow-lg transform group-hover:scale-105 transition-all duration-300">
                <img 
                  src="/earth.jpg" 
                  alt="Earth Icon" 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-3xl font-extrabold text-white tracking-wide font-rounded hover:text-blue-100 transition-colors" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
                COUNTRY EXPLORER
              </span>
            </Link>

            <div className="flex items-center space-x-6">
              <Link 
                to="/" 
                className="text-white/90 hover:text-white transition-colors duration-200 flex items-center space-x-2 font-bold"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="text-lg">Home</span>
              </Link>

              <Link 
                to="/favorites" 
                className="text-white/90 hover:text-white transition-colors duration-200 flex items-center space-x-2 font-bold"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="text-lg">Favorites</span>
              </Link>

              <button
                onClick={toggleTheme}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-200 flex items-center space-x-2 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl"
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
                <span className="font-bold">{theme === 'light' ? 'Dark' : 'Light'}</span>
              </button>
            </div>
          </div>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
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
            }
          />
          <Route
            path="/country/:code"
            element={<CountryDetail favorites={favorites} toggleFavorite={toggleFavorite} />}
          />
          <Route
            path="/favorites"
            element={<Favorites favorites={favorites} toggleFavorite={toggleFavorite} />}
          />
        
          <Route
            path="*"
            element={<div className="text-center text-red-500">Page not found</div>}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;