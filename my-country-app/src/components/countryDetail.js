import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function CountryDetail() {
  const { code } = useParams(); // Get country code from URL
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

  if (loading) return <div className="container mt-4">Loading...</div>;
  if (!country) return <div className="container mt-4">Country not found</div>;

  return (
    <div className="container mt-4">
      <Link to="/" className="btn btn-secondary mb-3">
        Back to Home
      </Link>
      <h1>{country.name.common}</h1>
      <img
        src={country.flags.png}
        alt={`${country.name.common} flag`}
        style={{ maxWidth: '200px', marginBottom: '20px' }}
      />
      <div className="card">
        <div className="card-body">
          <p><strong>Official Name:</strong> {country.name.official}</p>
          <p><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
          <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
          <p><strong>Region:</strong> {country.region}</p>
          <p><strong>Subregion:</strong> {country.subregion || 'N/A'}</p>
          <p><strong>Languages:</strong> {Object.values(country.languages || {}).join(', ') || 'N/A'}</p>
          <p><strong>Currencies:</strong> {Object.values(country.currencies || {})
            .map(c => `${c.name} (${c.symbol})`)
            .join(', ') || 'N/A'}</p>
          <p><strong>Timezones:</strong> {country.timezones.join(', ')}</p>
        </div>
      </div>
    </div>
  );
}

export default CountryDetail;