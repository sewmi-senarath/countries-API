import { Link } from 'react-router-dom';

function Favorites({ favorites, toggleFavorite }) {
  return (
    <div className="container mx-auto mt-6 px-4 mb-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Favorite Countries
        </h2>
        <p className="text-gray-600 mt-2">Your collection of favorite countries</p>
      </div>

      {favorites.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">⭐</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No Favorites Yet</h3>
          <p className="text-gray-600">Start adding countries to your favorites to see them here.</p>
          <Link 
            to="/" 
            className="inline-block mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
          >
            Browse Countries
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((country) => (
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
                <h3 className="absolute bottom-0 left-0 right-0 p-4 text-xl font-bold text-white">
                  {country.name.common}
                </h3>
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
                    <span className="w-24 font-semibold">Population:</span>
                    <span>{country.population.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Link 
                    to={`/country/${country.cca2}`} 
                    className="flex-1 px-4 py-2 bg-blue-500 text-white text-center rounded-lg hover:bg-blue-600 transition-all duration-300 text-sm font-medium"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => toggleFavorite(country)}
                    className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all duration-300 text-sm font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;