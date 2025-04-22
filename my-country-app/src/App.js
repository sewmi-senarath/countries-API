import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import SearchBar from './components/searchBar';
import FilterDropdown from './components/filterDropdown';
import CountryDetail from './components/countryDetail';
import Favorites from './components/Favorites';
import MapView from './components/MapView';
import CompareCountries from './components/CompareCountries';
import CountryList from './components/CountryList';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchHistory, setSearchHistory] = useState(
    JSON.parse(localStorage.getItem('searchHistory')) || []
  );
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) || []
  );
  const [compareList, setCompareList] = useState([]);

  // Fetch countries
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

  // Persist search history and theme
  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.setAttribute('data-bs-theme', theme);
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
    setSearchHistory((prev) => {
      const updatedHistory = [query, ...prev.filter((item) => item !== query)];
      return updatedHistory.slice(0, 3);
    });

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

  const handleRegionFilter = (region) => {
    if (region === 'All') {
      setFilteredCountries(countries);
      return;
    }
    axios
      .get(`https://restcountries.com/v3.1/region/${region}`)
      .then((response) => {
        setFilteredCountries(response.data);
      })
      .catch((error) => {
        console.error('Error filtering by region:', error);
        setFilteredCountries([]);
      });
  };

  const handleLanguageFilter = (language) => {
    if (language === 'All') {
      setFilteredCountries(countries);
      return;
    }
    axios
      .get(`https://restcountries.com/v3.1/lang/${language}`)
      .then((response) => {
        setFilteredCountries(response.data);
      })
      .catch((error) => {
        console.error('Error filtering by language:', error);
        setFilteredCountries([]);
      });
  };

  return (
    <Router>
      <div className="container mt-4">
        <nav className="navbar navbar-expand-lg navbar-light mb-4">
          <div className="container">
            <Link className="navbar-brand eye-catching-title" to="/">Country Explorer</Link>
            <div className="navbar-nav">
              <Link className="nav-link" to="/">Home</Link>
              <Link className="nav-link" to="/favorites">Favorites</Link>
              <Link className="nav-link" to="/map">Map View</Link>
              <button
                onClick={toggleTheme}
                className="btn btn-outline-secondary ms-2"
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? 'Dark' : 'Light'} Mode
              </button>
            </div>
          </div>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="row align-items-center mb-4">
                  <div className="col-md-8">
                    <SearchBar onSearch={handleSearch} countries={countries} />
                  </div>
                  <div className="col-md-4">
                    <FilterDropdown
                      onRegionFilter={handleRegionFilter}
                      onLanguageFilter={handleLanguageFilter}
                    />
                  </div>
                </div>
                <div className="mb-4 recent-searches">
                  <h5>Recent Searches:</h5>
                  <ul>
                    {searchHistory.map((search, index) => (
                      <li key={index}>{search}</li>
                    ))}
                  </ul>
                </div>
                <div className="map-section">
                  <MapView countries={filteredCountries} />
                </div>
                <CompareCountries compareList={compareList} toggleCompare={toggleCompare} />
                <CountryList
                  countries={filteredCountries}
                  loading={loading}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                  compareList={compareList}
                  toggleCompare={toggleCompare}
                />
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
            path="/map"
            element={<MapView countries={countries} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;