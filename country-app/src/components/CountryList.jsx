import { Link } from 'react-router-dom';
import { useState } from 'react';

function CountryList({ countries, loading, favorites, toggleFavorite, compareList, toggleCompare }) {
  const [currentPage, setCurrentPage] = useState(1);
  const countriesPerPage = 15;

  const totalCountries = countries.length;
  const totalPages = Math.ceil(totalCountries / countriesPerPage);
  const startIndex = (currentPage - 1) * countriesPerPage;
  const endIndex = startIndex + countriesPerPage;
  const currentCountries = countries.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {currentCountries.length === 0 ? (
          <p className="text-center text-gray-600 col-span-3">No countries found.</p>
        ) : (
          currentCountries.map((country) => (
            <div key={country.cca2} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={country.flags.png}
                alt={`Flag of ${country.name.common}`}
                className="w-full h-24 object-cover"
              />
              <div className="p-4">
                <h5 className="text-lg font-semibold text-gray-800">{country.name.common}</h5>
                <p className="text-gray-600">
                  <strong>Capital:</strong> {country.capital?.[0] || 'N/A'}<br />
                  <strong>Population:</strong> {country.population.toLocaleString()}<br />
                  <strong>Region:</strong> {country.region}<br />
                  <strong>Languages:</strong>{' '}
                  {Object.values(country.languages || {}).join(', ') || 'N/A'}
                </p>
                <div className="mt-3 flex space-x-2">
                  <Link to={`/country/${country.cca2}`} className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                    View Details
                  </Link>
                  <button
                    onClick={() => toggleFavorite(country)}
                    className={`px-3 py-1 rounded-md transition-colors ${
                      favorites.some((fav) => fav.cca2 === country.cca2)
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                    }`}
                  >
                    {favorites.some((fav) => fav.cca2 === country.cca2) ? 'Unfavorite' : 'Favorite'}
                  </button>
                  <button
                    onClick={() => toggleCompare(country)}
                    className={`px-3 py-1 rounded-md transition-colors ${
                      compareList.some((c) => c.cca2 === country.cca2)
                        ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                        : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                    } ${compareList.length >= 3 && !compareList.some((c) => c.cca2 === country.cca2) ? 'opacity-50 cursor-not-allowed' : ''}`}
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
        <nav aria-label="Country list pagination" className="mt-6 flex justify-center">
          <ul className="flex space-x-2">
            <li>
              <button
                className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-pastelBlue text-white hover:bg-pastelTurquoise'}`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </li>
            {[...Array(totalPages)].map((_, index) => (
              <li key={index + 1}>
                <button
                  className={`px-4 py-2 rounded-md ${currentPage === index + 1 ? 'bg-pastelPink text-white' : 'bg-pastelAliceBlue text-gray-700 hover:bg-pastelTurquoise'}`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                className={`px-4 py-2 rounded-md ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-pastelBlue text-white hover:bg-pastelTurquoise'}`}
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