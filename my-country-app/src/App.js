import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import SearchBar from './components/searchBar';
import FilterDropdown from './components/filterDropdown';
import CountryDetail from './components/countryDetail';
import './App.css';

function CountryList({ countries, loading }) {
  if (loading) return <p>Loading...</p>;
  return (
    <div className="row">
      {countries.length === 0 ? (
        <p>No countries found.</p>
      ) : (
        countries.map((country) => (
          <div key={country.cca2} className="col-md-4 mb-3">
            <div className="card">
              <img
                src={country.flags.png}
                alt={`${country.name.common} flag`}
                className="card-img-top"
                style={{ height: '100px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{country.name.common}</h5>
                <p className="card-text">
                  <strong>Capital:</strong> {country.capital?.[0] || 'N/A'}<br />
                  <strong>Population:</strong> {country.population.toLocaleString()}<br />
                  <strong>Region:</strong> {country.region}<br />
                  <strong>Languages:</strong>{' '}
                  {Object.values(country.languages || {}).join(', ') || 'N/A'}
                </p>
                <a href={`/country/${country.cca2}`} className="btn btn-primary">
                  View Details
                </a>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchHistory, setSearchHistory] = useState(
    JSON.parse(localStorage.getItem('searchHistory')) || []
  );

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

  const handleSearch = (query) => {
    // Add the final search term to history, limit to 3 most recent
    setSearchHistory((prev) => {
      const updatedHistory = [query, ...prev.filter((item) => item !== query)]; // Remove duplicates
      return updatedHistory.slice(0, 3); // Keep only the 3 most recent
    });

    // Perform the search
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
        <h1>Country Explorer</h1>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="row">
                  <div className="col-md-6">
                    <SearchBar onSearch={handleSearch} />
                  </div>
                  <div className="col-md-6">
                    <FilterDropdown
                      onRegionFilter={handleRegionFilter}
                      onLanguageFilter={handleLanguageFilter}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <h5>Recent Searches:</h5>
                  <ul>
                    {searchHistory.map((search, index) => (
                      <li key={index}>{search}</li>
                    ))}
                  </ul>
                </div>
                <CountryList countries={filteredCountries} loading={loading} />
              </>
            }
          />
          <Route path="/country/:code" element={<CountryDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;