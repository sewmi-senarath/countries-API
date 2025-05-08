import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

// Simple cache implementation
const countryCache = {};

function CountryDetail({ favorites, toggleFavorite, resetSearch }) {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountry = async (retries = 3) => {
      try {
        // Check cache first
        if (countryCache[code]) {
          setCountry(countryCache[code]);
          setLoading(false);
          return;
        }

        const response = await axios.get(`https://restcountries.com/v3.1/alpha/${code}`, {
          timeout: 5000 // 5 second timeout
        });

        // Cache the response
        countryCache[code] = response.data[0];
        setCountry(response.data[0]);
        setLoading(false);
        setError(null);
      } catch (error) {
        if (retries > 0) {
          // Exponential backoff
          const delay = 1000 * (4 - retries);
          await new Promise(resolve => setTimeout(resolve, delay));
          await fetchCountry(retries - 1);
        } else {
          console.error('Error fetching country details:', error);
          setError(error);
          setLoading(false);
        }
      }
    };

    fetchCountry();
  }, [code]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-700">Loading country details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center p-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg max-w-md border border-white/20">
          <div className="text-5xl mb-4">🌐</div>
          <h2 className="text-2xl font-bold mb-3 text-gray-800">Connection Issue</h2>
          <p className="mb-5 text-gray-600">
            We're having trouble loading this country's details. Please check your connection and try again.
          </p>
          <div className="flex justify-center gap-3">
            <button 
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-md transition-all"
            >
              Retry Now
            </button>
            <Link
              to="/"
              onClick={resetSearch} // Reset search on navigation
              className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all"
            >
              Back Home
            </Link>
不开            </div>
        </div>
      </div>
    );
  }

  if (!country) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center p-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg max-w-md border border-white/20">
          <div className="text-5xl mb-4">❓</div>
          <h2 className="text-2xl font-bold mb-3 text-gray-800">Country Not Found</h2>
          <p className="mb-5 text-gray-600">
            We couldn't find details for this country code. It may be invalid or unavailable.
          </p>
          <Link
            to="/"
            onClick={resetSearch} // Reset search on navigation
            className="inline-block px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-md transition-all"
          >
            Browse Countries
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      {/* Sophisticated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Gradient Base */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-950"></div>
        
        {/* Subtle Topographic Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/topography.png')] dark:opacity-5"></div>
        
        {/* Floating Geometric Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full mix-blend-multiply opacity-20 animate-float dark:opacity-10"
              style={{
                background: `radial-gradient(circle, ${i % 3 === 0 ? '#6366f1' : i % 3 === 1 ? '#8b5cf6' : '#ec4899'} 0%, transparent 70%)`,
                width: `${Math.random() * 300 + 100}px`,
                height: `${Math.random() * 300 + 100}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 30 + 30}s`,
                animationDelay: `${Math.random() * 10}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto pt-12 px-4 pb-24 relative">
        <Link 
          to="/" 
          onClick={resetSearch} // Reset search on navigation
          className="inline-flex items-center gap-2 px-5 py-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-white/20 dark:bg-gray-800/80 dark:border-gray-700 mb-8 group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700 group-hover:text-blue-600 dark:text-gray-300 dark:group-hover:text-purple-400 transition-colors" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          <span className="font-medium text-gray-700 group-hover:text-blue-600 dark:text-gray-300 dark:group-hover:text-purple-400 transition-colors">
            Back to Countries
          </span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="lg:sticky lg:top-4 space-y-6">
            {/* Flag Card */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/20 dark:bg-gray-800/90 dark:border-gray-700/50">
              <div className="relative pb-[60%]">
                <img
                  src={country.flags.svg || country.flags.png}
                  alt={`Flag of ${country.name.common}`}
                  className="absolute h-full w-full object-cover"
                  onError={(e) => {
                    e.target.src = '/flag-fallback.png'; // Add a fallback image
                  }}
                />
              </div>
              <div className="p-6">
                <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">{country.name.common}</h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">{country.name.official}</p>
                <button
                  onClick={() => toggleFavorite(country)}
                  className={`w-full py-3 rounded-xl transition-all duration-300 font-medium ${
                    favorites.some((fav) => fav.cca2 === country.cca2)
                      ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg hover:shadow-xl'
                      : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border border-gray-200 hover:border-gray-300 dark:from-gray-700 dark:to-gray-800 dark:text-gray-300 dark:border-gray-600'
                  }`}
                >
                  {favorites.some((fav) => fav.cca2 === country.cca2) 
                    ? '❤️ Remove from Favorites' 
                    : '🤍 Add to Favorites'}
                </button>
              </div>
            </div>

            {/* Maps Section */}
            {country.maps && (
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20 dark:bg-gray-800/90 dark:border-gray-700/50">
                <SectionTitle icon="🌐" title="Explore on Maps" />
                <div className="space-y-3">
                  <a 
                    href={country.maps.googleMaps} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C8.1 0 5 3.1 5 7c0 1.9.7 3.7 2.1 5 .1.1 4.9 5 4.9 5s4.8-4.9 4.9-5c1.4-1.3 2.1-3.1 2.1-5 0-3.9-3.1-7-7-7zm0 10c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z"/>
                    </svg>
                    Google Maps
                  </a>
                  <a 
                    href={country.maps.openStreetMaps} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm0 2c5.5 0 10 4.5 10 10s-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2zm0 4c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zm0 2c2.2 0 4 1.8 4 4s-1.8 4-4 4-4-1.8-4-4 1.8-4 4-4z"/>
                    </svg>
                    OpenStreetMap
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Facts */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20 dark:bg-gray-800/90 dark:border-gray-700/50">
              <SectionTitle icon="📊" title="Key Statistics" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoCard 
                  icon="🏛️" 
                  title="Capital" 
                  value={country.capital?.[0] || 'N/A'} 
                  color="from-blue-500 to-blue-600"
                />
                <InfoCard 
                  icon="👥" 
                  title="Population" 
                  value={country.population.toLocaleString()} 
                  color="from-purple-500 to-purple-600"
                />
                <InfoCard 
                  icon="🌍" 
                  title="Region" 
                  value={country.region} 
                  color="from-green-500 to-green-600"
                />
                <InfoCard 
                  icon="🗺️" 
                  title="Subregion" 
                  value={country.subregion || 'N/A'} 
                  color="from-amber-500 to-amber-600"
                />
              </div>
            </div>

            {/* Detailed Information */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20 dark:bg-gray-800/90 dark:border-gray-700/50">
              <SectionTitle icon="📌" title="Country Details" />
              <div className="space-y-4">
                <DetailSection 
                  title="Languages" 
                  content={Object.values(country.languages || {}).join(', ') || 'N/A'}
                  icon="🗣️"
                />
                <DetailSection 
                  title="Currencies" 
                  content={Object.values(country.currencies || {})
                    .map(c => `${c.name} (${c.symbol || '—'})`)
                    .join(', ') || 'N/A'}
                  icon="💰"
                />
                <DetailSection 
                  title="Timezones" 
                  content={country.timezones.join(', ')} 
                  icon="⏰"
                />
                <DetailSection 
                  title="Area" 
                  content={`${country.area.toLocaleString()} km²`}
                  icon="📏"
                />
                {country.borders && country.borders.length > 0 && (
                  <DetailSection 
                    title="Bordering Countries" 
                    content={country.borders.join(', ')}
                    icon="🚧"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Components
const InfoCard = ({ icon, title, value, color }) => (
  <div className="p-4 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:from-gray-700 dark:to-gray-800 dark:border-gray-600 group">
    <div className="flex items-start gap-3">
      <div className={`p-3 rounded-lg bg-gradient-to-br ${color} text-white text-xl`}>
        {icon}
      </div>
      <div>
        <div className="text-sm font-medium text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300 transition-colors">
          {title}
        </div>
        <div className="text-lg font-semibold text-gray-800 dark:text-white">
          {value}
        </div>
      </div>
    </div>
  </div>
);

const DetailSection = ({ title, content, icon }) => (
  <div className="p-4 bg-gradient-to-br from-white to-gray-50 rounded-xl hover:shadow-sm transition-shadow duration-300 border border-gray-100 dark:from-gray-700 dark:to-gray-800 dark:border-gray-600">
    <div className="flex items-center gap-3 mb-2">
      <span className="text-xl">{icon}</span>
      <h3 className="text-lg font-medium text-gray-700 dark:text-white">{title}</h3>
    </div>
    <p className="text-gray-600 dark:text-gray-300 pl-9">{content}</p>
  </div>
);

const SectionTitle = ({ icon, title }) => (
  <div className="flex items-center space-x-3 mb-6">
    <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg">
      {icon}
    </div>
    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
      {title}
    </h2>
  </div>
);

export default CountryDetail;