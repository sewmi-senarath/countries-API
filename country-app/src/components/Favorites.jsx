import { Link } from 'react-router-dom';
// import '../App.css';

function Favorites({ favorites, toggleFavorite }) {
  return (
    <div className="container mx-auto mt-6 px-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Favorite Countries</h2>
      {favorites.length === 0 ? (
        <p className="text-gray-600">No favorites yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {favorites.map((country) => (
            <div key={country.cca2} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={country.flags.png}
                alt={`Flag of ${country.name.common}`}
                className="w-full h-24 object-cover"
              />
              <div className="p-4">
                <h5 className="text-lg font-semibold text-gray-800">{country.name.common}</h5>
                <div className="mt-3 flex space-x-2">
                  <Link to={`/country/${country.cca2}`} className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                    View Details
                  </Link>
                  <button
                    onClick={() => toggleFavorite(country)}
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                  >
                    Unfavorite
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