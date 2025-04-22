import { Link } from 'react-router-dom';

function Favorites({ favorites, toggleFavorite }) {
  return (
    <div className="container mt-4">
      <h2>Favorite Countries</h2>
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <div className="row">
          {favorites.map((country) => (
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
                  <Link to={`/country/${country.cca2}`} className="btn btn-primary">
                    View Details
                  </Link>
                  <button
                    onClick={() => toggleFavorite(country)}
                    className="btn btn-danger ms-2"
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