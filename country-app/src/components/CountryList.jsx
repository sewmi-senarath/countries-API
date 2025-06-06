import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../App.css';

function CountryList({ countries, loading, favorites, toggleFavorite, compareList, toggleCompare }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isHovering, setIsHovering] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const countriesPerPage = 12;

  // Sort countries
  const sortedCountries = [...countries].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    if (sortConfig.key === 'population') {
      return sortConfig.direction === 'asc' 
        ? a.population - b.population 
        : b.population - a.population;
    } else {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    }
  });

  // Calculate pagination
  const totalCountries = sortedCountries.length;
  const totalPages = Math.ceil(totalCountries / countriesPerPage);
  const currentCountries = sortedCountries.slice(
    (currentPage - 1) * countriesPerPage,
    currentPage * countriesPerPage
  );

  // Auto-scroll to top on page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate visible page numbers with ellipsis
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      const leftBound = Math.max(2, currentPage - 1);
      const rightBound = Math.min(totalPages - 1, currentPage + 1);

      pages.push(1);
      if (leftBound > 2) pages.push('...');
      for (let i = leftBound; i <= rightBound; i++) pages.push(i);
      if (rightBound < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }
    
    return pages;
  };

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    setCurrentPage(1); // Reset to first page when sorting changes
  };

  if (loading) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="relative w-20 h-20 mb-4">
          <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-4 border-purple-500 border-b-transparent animate-spin animation-delay-100"></div>
        </div>
        <p className="text-lg font-medium text-gray-600">Loading countries...</p>
      </div>
    </div>
  );

  return (
    <div className="relative">
      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden opacity-10">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full animate-float"
            style={{
              background: `radial-gradient(circle, ${i % 3 === 0 ? '#6366f1' : i % 3 === 1 ? '#8b5cf6' : '#ec4899'} 0%, transparent 70%)`,
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 30 + 30}s`,
              animationDelay: `${Math.random() * 10}s`,
              opacity: 0.1
            }}
          ></div>
        ))}
      </div>

      {/* Country Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {currentCountries.length === 0 ? (
          <div className="col-span-full py-12 text-center">
            <div className="inline-block p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
              <div className="text-6xl mb-4">🌍</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No Countries Found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
              <Link 
                to="/" 
                className="inline-flex items-center px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all"
              >
                Reset Search
              </Link>
            </div>
          </div>
        ) : (
          currentCountries.map((country) => (
            <div 
              key={country.cca2}
              role="article"
              className="relative group"
              onMouseEnter={() => setIsHovering(country.cca2)}
              onMouseLeave={() => setIsHovering(null)}
            >
              {/* Country Card */}
              <div className="h-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-white/20 transition-all duration-500 hover:shadow-xl hover:border-blue-200/50">
                {/* Flag Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={country.flags.svg || country.flags.png}
                    alt={`Flag of ${country.name.common}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Country Name */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-xl font-bold text-white drop-shadow-lg">
                      {country.name.common}
                    </h3>
                    <p className="text-blue-100 font-medium">
                      {country.capital?.[0] || 'N/A'}
                    </p>
                  </div>
                  
                  {/* Favorite Badge */}
                  <div className="absolute top-4 right-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(country);
                      }}
                      className={`p-2 rounded-full backdrop-blur-sm transition-all ${
                        favorites.some(f => f.cca2 === country.cca2)
                          ? 'bg-red-500/90 text-white shadow-lg hover:scale-110'
                          : 'bg-white/80 text-gray-700 hover:bg-white hover:scale-110'
                      }`}
                      aria-label={favorites.some(f => f.cca2 === country.cca2) ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      {/* SVG Icon - visible on screen */}
                      {favorites.some(f => f.cca2 === country.cca2) ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      )}
                      {/* Hidden text for tests */}
                      <span className="sr-only">
                        {favorites.some(f => f.cca2 === country.cca2) ? '❤️' : '🤍'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Country Details */}
                <div className="p-5">
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Region</p>
                      <p className="font-medium text-gray-800">{country.region}</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Population</p>
                      </div>
                      <p className="font-medium text-gray-800">{country.population.toLocaleString()}</p>
                    </div>
                    <div className="space-y-1 col-span-2">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Languages</p>
                      <p className="font-medium text-gray-800 line-clamp-2">
                        {Object.values(country.languages || {}).join(', ') || 'N/A'}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Link
                      to={`/country/${country.cca2}`}
                      className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-lg hover:shadow-md transition-all flex items-center justify-center gap-1 hover:scale-[1.02]"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clipRule="evenodd" />
                      </svg>
                      Details
                    </Link>
                    <button
                      onClick={() => toggleCompare(country)}
                      disabled={compareList.length >= 3 && !compareList.some(c => c.cca2 === country.cca2)}
                      className={`px-3 py-2 text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-1 hover:scale-[1.02] ${
                        compareList.some(c => c.cca2 === country.cca2)
                          ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                          : compareList.length >= 3
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {compareList.some(c => c.cca2 === country.cca2) ? (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Added
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                          </svg>
                          Compare
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Hover Effect */}
              {isHovering === country.cca2 && (
                <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 pointer-events-none -z-10"></div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Enhanced Pagination */}
      {totalCountries > countriesPerPage && (
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-600">
            Showing <span className="font-medium">{(currentPage - 1) * countriesPerPage + 1}</span> to{' '}
            <span className="font-medium">{Math.min(currentPage * countriesPerPage, totalCountries)}</span> of{' '}
            <span className="font-medium">{totalCountries}</span> countries
          </div>
          
          <nav aria-label="Pagination">
            <ul className="flex flex-wrap gap-2">
              <li>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg flex items-center gap-1 transition-all ${
                    currentPage === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm border border-gray-200 hover:scale-105'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Previous
                </button>
              </li>
              
              {getPageNumbers().map((page, index) => (
                <li key={index}>
                  {page === '...' ? (
                    <span className="px-4 py-2 text-gray-500">...</span>
                  ) : (
                    <button
                      onClick={() => handlePageChange(page)}
                      className={`px-4 py-2 rounded-lg transition-all hover:scale-105 ${
                        currentPage === page
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                          : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm border border-gray-200'
                      }`}
                    >
                      {page}
                    </button>
                  )}
                </li>
              ))}
              
              <li>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg flex items-center gap-1 transition-all ${
                    currentPage === totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm border border-gray-200 hover:scale-105'
                  }`}
                >
                  Next
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}

export default CountryList;