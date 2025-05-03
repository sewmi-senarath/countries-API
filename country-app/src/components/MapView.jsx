// import { MapContainer, TileLayer, useMap } from 'react-leaflet';
// import { Link } from 'react-router-dom';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import 'leaflet.markercluster/dist/MarkerCluster.css';
// import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
// import { useEffect } from 'react';

// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
//   iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
//   shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
// });

// function ClusterLayer({ countries }) {
//   const map = useMap();

//   useEffect(() => {
//     const markerClusterGroup = L.markerClusterGroup();

//     countries.forEach((country) => {
//       if (country.latlng) {
//         const marker = L.marker(country.latlng);
//         marker.bindPopup(`<a href="/country/${country.cca2}">${country.name.common}</a>`);
//         markerClusterGroup.addLayer(marker);
//       }
//     });

//     map.addLayer(markerClusterGroup);

//     return () => {
//       map.removeLayer(markerClusterGroup);
//     };
//   }, [map, countries]);

//   return null;
// }

// function MapView({ countries }) {
//   return (
//     <div className="mb-6">
//       <MapContainer center={[20, 0]} zoom={2} className="h-96 w-full rounded-lg shadow-md">
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         <ClusterLayer countries={countries} />
//       </MapContainer>
//     </div>
//   );
// }

// export default MapView;

import { useEffect } from 'react';
     import { APIProvider, Map, AdvancedMarker, useMap } from '@vis.gl/react-google-maps';
     import { Link } from 'react-router-dom';
     import { MarkerClusterer } from '@googlemaps/markerclusterer';

     function ClusterLayer({ countries }) {
       const map = useMap();

       useEffect(() => {
         if (!map || !countries) return;

         const markers = countries
           .filter(country => country.latlng)
           .map(country => {
             const marker = new google.maps.Marker({
               position: { lat: country.latlng[0], lng: country.latlng[1] },
               title: country.name.common,
             });

             const infoWindow = new google.maps.InfoWindow({
               content: `<a href="/country/${country.cca2}">${country.name.common}</a>`,
             });

             marker.addListener('click', () => {
               infoWindow.open(map, marker);
             });

             return marker;
           });

         const clusterer = new MarkerClusterer({ map, markers });

         return () => {
           clusterer.clearMarkers();
           markers.forEach(marker => marker.setMap(null));
         };
       }, [map, countries]);

       return null;
     }

     function MapView({ countries }) {
       return (
         <div className="mb-6">
           <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
             <Map
               defaultCenter={{ lat: 20, lng: 0 }}
               defaultZoom={2}
               style={{ height: '384px', width: '100%' }}
               mapId="country-explorer-map"
               className="rounded-lg shadow-md"
             >
               <ClusterLayer countries={countries} />
             </Map>
           </APIProvider>
         </div>
       );
     }

     export default MapView;