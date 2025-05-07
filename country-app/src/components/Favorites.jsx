// import { Link } from 'react-router-dom';

// function Favorites({ favorites, toggleFavorite }) {
//   return (
//     <div className="container mx-auto mt-6 px-4 mb-12">
//       <div className="mb-8">
//         <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//           Favorite Countries
//         </h2>
//         <p className="text-gray-600 mt-2">Your collection of favorite countries</p>
//       </div>

//       {favorites.length === 0 ? (
//         <div className="bg-white rounded-xl shadow-lg p-8 text-center">
//           <div className="text-6xl mb-4">⭐</div>
//           <h3 className="text-xl font-semibold text-gray-800 mb-2">No Favorites Yet</h3>
//           <p className="text-gray-600">Start adding countries to your favorites to see them here.</p>
//           <Link 
//             to="/" 
//             className="inline-block mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
//           >
//             Browse Countries
//           </Link>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {favorites.map((country) => (
//             <div 
//               key={country.cca2} 
//               className="bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
//             >
//               <div className="relative h-40 overflow-hidden">
//                 <img
//                   src={country.flags.png}
//                   alt={`Flag of ${country.name.common}`}
//                   className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
//                 <h3 className="absolute bottom-0 left-0 right-0 p-4 text-xl font-bold text-white">
//                   {country.name.common}
//                 </h3>
//               </div>

//               <div className="p-6">
//                 <div className="space-y-2 mb-4">
//                   <div className="flex items-center text-gray-700">
//                     <span className="w-24 font-semibold">Capital:</span>
//                     <span>{country.capital?.[0] || 'N/A'}</span>
//                   </div>
//                   <div className="flex items-center text-gray-700">
//                     <span className="w-24 font-semibold">Region:</span>
//                     <span>{country.region}</span>
//                   </div>
//                   <div className="flex items-center text-gray-700">
//                     <span className="w-24 font-semibold">Population:</span>
//                     <span>{country.population.toLocaleString()}</span>
//                   </div>
//                 </div>

//                 <div className="flex gap-2 mt-4">
//                   <Link 
//                     to={`/country/${country.cca2}`} 
//                     className="flex-1 px-4 py-2 bg-blue-500 text-white text-center rounded-lg hover:bg-blue-600 transition-all duration-300 text-sm font-medium"
//                   >
//                     View Details
//                   </Link>
//                   <button
//                     onClick={() => toggleFavorite(country)}
//                     className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all duration-300 text-sm font-medium"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Favorites;

import { Link } from 'react-router-dom';

function Favorites({ favorites, toggleFavorite }) {
  return (
    <div className="relative min-h-screen">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          {/* World map pattern */}
          <div className="absolute inset-0 bg-[url('https://svgur.com/i/zxr.svg')] bg-[length:800px] bg-center bg-repeat opacity-30"></div>
        </div>
        {/* Floating country shapes */}
        {[...Array(8)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-blue-200 opacity-20"
            style={{
              width: `${Math.random() * 200 + 100}px`,
              height: `${Math.random() * 200 + 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
              filter: 'blur(40px)'
            }}
          ></div>
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto pt-12 px-4 pb-24 relative">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent inline-block">
            Favorite Countries
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Your personal collection of amazing destinations around the world
          </p>
          <div className="mt-4 w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
        </div>

        {favorites.length === 0 ? (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-12 text-center max-w-2xl mx-auto border border-white/20">
            <div className="text-8xl mb-6 text-yellow-400">🌎</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Your Travel Diary is Empty</h3>
            <p className="text-gray-600 mb-6">
              Start your journey by exploring countries and adding them to your favorites!
            </p>
            <Link 
              to="/" 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium group"
            >
              Explore Countries
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favorites.map((country) => (
              <div 
                key={country.cca2} 
                className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={country.flags.png}
                    alt={`Flag of ${country.name.common}`}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                      {country.name.common}
                    </h3>
                    <p className="text-blue-100 font-medium">
                      {country.capital?.[0] || 'N/A'}
                    </p>
                  </div>
                  <div className="absolute top-3 right-3 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-md">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(country);
                      }}
                      className="text-red-500 hover:text-red-600 transition-colors"
                      aria-label="Remove from favorites"
                    >
                      ❤️
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                      {country.region}
                    </span>
                    <span className="text-gray-700 text-sm">
                      👥 {country.population.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <Link 
                      to={`/country/${country.cca2}`} 
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-center rounded-lg hover:shadow-md transition-all duration-300 text-sm font-medium flex items-center justify-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                      Details
                    </Link>
                    <button
                      onClick={() => toggleFavorite(country)}
                      className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all duration-300 text-sm font-medium flex items-center justify-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;