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

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
  
  if (!country) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-2xl text-gray-700">Country not found</div>
    </div>
  );

  return (
    <div className="container mx-auto mt-6 px-4 mb-12">
      <div className="flex items-center mb-8">
        <Link 
          to="/" 
          className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Home
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="lg:sticky lg:top-4 space-y-6">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="relative pb-[56.25%]">
              <img
                src={country.flags.svg || country.flags.png}
                alt={`Flag of ${country.name.common}`}
                className="absolute h-full w-full object-cover"
              />
            </div>
            <div className="p-6">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">{country.name.common}</h1>
              <p className="text-xl text-gray-600 mb-4">{country.name.official}</p>
              <button
                onClick={() => toggleFavorite(country)}
                className={`w-full py-3 rounded-lg transition-colors ${
                  favorites.some((fav) => fav.cca2 === country.cca2)
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-red-100 text-red-700 hover:bg-red-200'
                }`}
              >
                {favorites.some((fav) => fav.cca2 === country.cca2) ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
              </button>
            </div>
          </div>

          {country.maps && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl shadow-lg border border-blue-100">
              <SectionTitle icon="🗺️" title="Maps" />
              <div className="space-y-2">
                <a 
                  href={country.maps.googleMaps} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-center"
                >
                  View on Google Maps
                </a>
                <a 
                  href={country.maps.openStreetMaps} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-center"
                >
                  View on OpenStreetMap
                </a>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl shadow-lg border border-blue-100">
            <SectionTitle icon="📊" title="Quick Facts" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoCard icon="🏛️" title="Capital" value={country.capital?.[0] || 'N/A'} />
              <InfoCard icon="👥" title="Population" value={country.population.toLocaleString()} />
              <InfoCard icon="🌍" title="Region" value={country.region} />
              <InfoCard icon="🗺️" title="Subregion" value={country.subregion || 'N/A'} />
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl shadow-lg border border-blue-100">
            <SectionTitle icon="📌" title="Detailed Information" />
            <div className="space-y-4">
              <DetailSection 
                title="Languages" 
                content={Object.values(country.languages || {}).join(', ') || 'N/A'} 
              />
              <DetailSection 
                title="Currencies" 
                content={Object.values(country.currencies || {})
                  .map(c => `${c.name} (${c.symbol})`)
                  .join(', ') || 'N/A'} 
              />
              <DetailSection 
                title="Timezones" 
                content={country.timezones.join(', ')} 
              />
              <DetailSection 
                title="Area" 
                content={`${country.area.toLocaleString()} km²`} 
              />
              {country.borders && (
                <DetailSection 
                  title="Borders" 
                  content={country.borders.join(', ')} 
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Components
const InfoCard = ({ icon, title, value }) => (
  <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-blue-100">
    <div className="text-2xl mb-2 transform hover:scale-110 transition-transform duration-200">{icon}</div>
    <div className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{title}</div>
    <div className="text-lg font-semibold text-gray-800">{value}</div>
  </div>
);

const DetailSection = ({ title, content }) => (
  <div className="p-4 bg-white rounded-lg hover:shadow-md transition-shadow duration-300">
    <h3 className="text-lg font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">{title}</h3>
    <p className="text-gray-700">{content}</p>
  </div>
);

const SectionTitle = ({ icon, title }) => (
  <div className="flex items-center space-x-3 mb-4">
    <span className="text-2xl">{icon}</span>
    <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
      {title}
    </h2>
  </div>
);

export default CountryDetail;