import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
   import { Link } from 'react-router-dom';
   import L from 'leaflet'; // Import Leaflet library
   import 'leaflet/dist/leaflet.css';

   // Fix for default marker icons
   delete L.Icon.Default.prototype._getIconUrl;
   L.Icon.Default.mergeOptions({
     iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
     iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
     shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
   });

   function MapView({ countries }) {
     return (
       <div className="mb-4">
         <h5>Explore Countries on Map</h5>
         <MapContainer center={[20, 0]} zoom={2} style={{ height: '400px', width: '100%' }}>
           <TileLayer
             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
             attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
           />
           {countries.map((country) => (
             country.latlng && (
               <Marker key={country.cca2} position={country.latlng}>
                 <Popup>
                   <Link to={`/country/${country.cca2}`}>{country.name.common}</Link>
                 </Popup>
               </Marker>
             )
           ))}
         </MapContainer>
       </div>
     );
   }

   export default MapView;