import { Link } from 'react-router-dom';
import { useState } from 'react';

function CountryList({ countries, loading, favorites, toggleFavorite, compareList, toggleCompare }) {
  const [currentPage, setCurrentPage] = useState(1);
  const countriesPerPage = 27;

  // Calculate pagination details
  const totalCountries = countries.length;
  const totalPages = Math.ceil(totalCountries / countriesPerPage);
  const startIndex = (currentPage - 1) * countriesPerPage;
  const endIndex = startIndex + countriesPerPage;
  const currentCountries = countries.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top on page change
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="row">
        {currentCountries.length === 0 ? (
          <p>No countries found.</p>
        ) : (
          currentCountries.map((country) => (
            <div key={country.cca2} className="col-md-4 mb-3">
              <div className="card">
                <img
                  src={country.flags.png}
                  alt={`Flag of ${country.name.common}`}
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
                  <Link to={`/country/${country.cca2}`} className="btn btn-primary">
                    View Details
                  </Link>
                  <button
                    onClick={() => toggleFavorite(country)}
                    className={`btn ${favorites.some((fav) => fav.cca2 === country.cca2) ? 'btn-danger' : 'btn-outline-danger'} ms-2`}
                  >
                    {favorites.some((fav) => fav.cca2 === country.cca2) ? 'Unfavorite' : 'Favorite'}
                  </button>
                  <button
                    onClick={() => toggleCompare(country)}
                    className={`btn ${compareList.some((c) => c.cca2 === country.cca2) ? 'btn-warning' : 'btn-outline-warning'} ms-2`}
                    disabled={compareList.length >= 3 && !compareList.some((c) => c.cca2 === country.cca2)}
                  >
                    {compareList.some((c) => c.cca2 === country.cca2) ? 'Remove from Compare' : 'Compare'}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {totalCountries > countriesPerPage && (
        <nav aria-label="Country list pagination" className="mt-4">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </li>
            {[...Array(totalPages)].map((_, index) => (
              <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}

export default CountryList;