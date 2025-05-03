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
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

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
      <div className="container mx-auto mt-6 px-4">
        <nav className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-800 to-gray-600 rounded-lg shadow-md mb-6">
          <Link
            to="/"
            className="text-4xl font-extrabold uppercase tracking-wider bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent shadow-md hover:from-purple-500 hover:to-blue-500 transition-all duration-300"
          >
            Country Explorer
          </Link>
          <div className="flex space-x-4 items-center">
            <Link to="/" className="text-lg text-gray-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/favorites" className="text-lg text-gray-300 hover:text-white transition-colors">
              Favorites
            </Link>
            <Link to="/map" className="text-lg text-gray-300 hover:text-white transition-colors">
              Map View
            </Link>
            <button
              onClick={toggleTheme}
              className="px-3 py-1 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-500 transition-colors"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? 'Dark' : 'Light'} Mode
            </button>
          </div>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="flex flex-col md:flex-row md:space-x-4 mb-6 items-center">
                  <div className="w-full md:w-2/3">
                    <SearchBar onSearch={handleSearch} countries={countries} />
                  </div>
                  <div className="w-full md:w-1/3">
                    <FilterDropdown onRegionFilter={handleRegionFilter} onLanguageFilter={handleLanguageFilter} />
                  </div>
                </div>
                <div className="mb-6 p-4 bg-gray-700 rounded-lg shadow-md">
                  <h5 className="text-lg font-semibold text-gray-300 mb-2">Recent Searches:</h5>
                  <ul className="list-disc pl-5 text-gray-300">
                    {searchHistory.map((search, index) => (
                      <li key={index}>{search}</li>
                    ))}
                  </ul>
                </div>
                <div className="mb-6 p-4 bg-gray-800 rounded-lg shadow-md">
                  <h5 className="text-lg font-semibold text-blue-400 mb-2">Explore Countries on Map</h5>
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