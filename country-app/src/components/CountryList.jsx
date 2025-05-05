import { Link } from 'react-router-dom';
import { useState } from 'react';
import '../App.css';

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
            <div 
              key={country.cca2} 
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src={country.flags.png}
                  alt={`Flag of ${country.name.common}`}
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <h5 className="absolute bottom-0 left-0 right-0 p-4 text-xl font-bold text-white">
                  {country.name.common}
                </h5>
              </div>
              <div className="p-6">
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-700">
                    <span className="w-24 font-semibold">Capital:</span>
                    <span>{country.capital?.[0] || 'N/A'}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-700">
                    <span className="w-24 font-semibold">Region:</span>
                    <span>{country.region}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-700">
                    <span className="w-24 font-semibold">Languages:</span>
                    <span className="line-clamp-1">{Object.values(country.languages || {}).join(', ') || 'N/A'}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  <Link 
                    to={`/country/${country.cca2}`} 
                    className="flex-1 px-3 py-1.5 bg-blue-500 text-white text-sm text-center rounded-md hover:bg-blue-600 transition-all duration-300 ease-in-out transform hover:-translate-y-0.5"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => toggleFavorite(country)}
                    className={`flex-1 px-3 py-1.5 text-sm rounded-md transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 ${
                      favorites.some((fav) => fav.cca2 === country.cca2)
                        ? 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {favorites.some((fav) => fav.cca2 === country.cca2) ? '★' : '☆'}
                  </button>
                  <button
                    onClick={() => toggleCompare(country)}
                    className={`flex-1 px-3 py-1.5 text-sm rounded-md transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 ${
                      compareList.some((c) => c.cca2 === country.cca2)
                        ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    } ${compareList.length >= 3 && !compareList.some((c) => c.cca2 === country.cca2) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={compareList.length >= 3 && !compareList.some((c) => c.cca2 === country.cca2)}
                  >
                    {compareList.some((c) => c.cca2 === country.cca2) ? '✓' : '+'}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      {totalCountries > countriesPerPage && (
        <nav aria-label="Country list pagination" className="mt-8 flex justify-center">
          <ul className="flex flex-wrap gap-2 justify-center">
            <li>
              <button
                className={`px-4 py-2 rounded-lg font-medium ${
                  currentPage === 1 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </li>
            {[...Array(totalPages)].map((_, index) => (
              <li key={index + 1}>
                <button
                  className={`px-4 py-2 rounded-lg font-medium ${
                    currentPage === index + 1 
                      ? 'bg-blue-100 text-blue-700 border-2 border-blue-500' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                className={`px-4 py-2 rounded-lg font-medium ${
                  currentPage === totalPages 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
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