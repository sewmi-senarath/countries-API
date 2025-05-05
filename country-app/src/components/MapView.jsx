import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { Icon } from 'leaflet';
import { Link } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';

const customIcon = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  shadowSize: [41, 41]
});

// Add this new component for handling map updates
function MapUpdater({ selectedCountry }) {
  const map = useMap();

  useEffect(() => {
    if (selectedCountry && selectedCountry.latlng) {
      map.setView([selectedCountry.latlng[0], selectedCountry.latlng[1]], 5, {
        animate: true,
        duration: 1
      });
    }
  }, [selectedCountry, map]);

  return null;
}

function MapView({ countries }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleSearch = useCallback((e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query) {
      const found = countries.find(country => 
        country.name.common.toLowerCase().includes(query)
      );
      setSelectedCountry(found || null);
    } else {
      setSelectedCountry(null);
    }
  }, [countries]);

  useEffect(() => {
    // Debug which countries are missing coordinates
    countries.forEach(country => {
      if (!country.latlng || country.latlng.length !== 2) {
        console.log(`Missing coordinates for: ${country.name.common}`);
      }
    });
  }, [countries]);

  return (
    <div className="flex flex-col gap-4">
      {/* Add search input above the map */}
      <div className="relative w-1/3 mb-2"> {/* Added w-1/3 for smaller width */}
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search for a country..."
          className="w-full p-2 pl-8 text-sm border border-blue-200 rounded-lg 
          focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500 
          bg-blue-50 text-gray-700 placeholder-gray-500
          transition-all duration-200"
        />
        <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
          <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <div className="h-[800px] w-full">
        <MapContainer 
          center={[20, 0]} 
          zoom={2} 
          className="h-full w-full rounded-xl shadow-lg"
          minZoom={2}
          maxZoom={18}
          scrollWheelZoom={true}
        >
          <MapUpdater selectedCountry={selectedCountry} />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            language="en" // Try to force English language
          />
          <MarkerClusterGroup
            chunkedLoading
            maxClusterRadius={50}
            spiderfyOnMaxZoom={true}
            showCoverageOnHover={false}
            iconCreateFunction={(cluster) => {
              const count = cluster.getChildCount();
              let size = 'small';
              let className = 'marker-cluster marker-cluster-';
              
              if (count > 100) {
                size = 'large';
                className += 'large';
              } else if (count > 10) {
                size = 'medium';
                className += 'medium';
              } else {
                className += 'small';
              }
              
              return L.divIcon({
                html: `<div><span>${count}</span></div>`,
                className: className,
                iconSize: L.point(40, 40)
              });
            }}
          >
            {countries.map((country) => {
              if (country.latlng && country.latlng.length === 2) {
                return (
                  <Marker 
                    key={country.cca2}
                    position={[country.latlng[0], country.latlng[1]]}
                    icon={customIcon}
                  >
                    <Popup>
                      <div className={`flex flex-col items-center p-2 ${
                        selectedCountry?.cca2 === country.cca2 ? 'ring-2 ring-blue-500' : ''
                      }`}>
                        <img 
                          src={country.flags.png} 
                          alt={`${country.name.common} flag`}
                          className="w-24 h-16 object-cover mb-2 rounded shadow-sm"
                        />
                        <h3 className="font-bold text-lg mb-1">{country.name.common}</h3>
                        <p className="text-sm text-gray-600">Capital: {country.capital?.[0] || 'N/A'}</p>
                        <p className="text-sm text-gray-600">Population: {country.population.toLocaleString()}</p>
                        <Link 
                          to={`/country/${country.cca2}`}
                          className="mt-2 px-4 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
                        >
                          View Details
                        </Link>
                      </div>
                    </Popup>
                  </Marker>
                );
              }
              return null;
            })}
          </MarkerClusterGroup>
        </MapContainer>
      </div>
    </div>
  );
}

export default MapView;