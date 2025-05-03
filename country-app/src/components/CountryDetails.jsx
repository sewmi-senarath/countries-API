import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

function CountryDetail({ favorites, toggleFavorite }) {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/alpha/${code}`)
      .then((response) => {
        setCountry(response.data[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching country details:', error);
        setLoading(false);
      });
  }, [code]);

  if (loading) return <div className="container mx-auto mt-6 px-4 text-center text-gray-600">Loading...</div>;
  if (!country) return <div className="container mx-auto mt-6 px-4 text-center text-gray-600">Country not found</div>;

  return (
    <div className="container mx-auto mt-6 px-4">
      <Link to="/" className="inline-block mb-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors">
        Back to Home
      </Link>
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{country.name.common}</h1>
      <img
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`}
        className="max-w-xs mb-6 rounded-lg shadow-md"
      />
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-700"><strong>Official Name:</strong> {country.name.official}</p>
        <p className="text-gray-700"><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
        <p className="text-gray-700"><strong>Population:</strong> {country.population.toLocaleString()}</p>
        <p className="text-gray-700"><strong>Region:</strong> {country.region}</p>
        <p className="text-gray-700"><strong>Subregion:</strong> {country.subregion || 'N/A'}</p>
        <p className="text-gray-700"><strong>Languages:</strong> {Object.values(country.languages || {}).join(', ') || 'N/A'}</p>
        <p className="text-gray-700"><strong>Currencies:</strong> {Object.values(country.currencies || {})
          .map(c => `${c.name} (${c.symbol})`)
          .join(', ') || 'N/A'}</p>
        <p className="text-gray-700"><strong>Timezones:</strong> {country.timezones.join(', ')}</p>
        <button
          onClick={() => toggleFavorite(country)}
          className={`mt-4 px-4 py-2 rounded-md transition-colors ${
            favorites.some((fav) => fav.cca2 === country.cca2)
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-red-100 text-red-700 hover:bg-red-200'
          }`}
        >
          {favorites.some((fav) => fav.cca2 === country.cca2) ? 'Unfavorite' : 'Favorite'}
        </button>
      </div>
    </div>
  );
}

export default CountryDetail;