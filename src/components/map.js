// components/Map.js
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Configuración de los iconos
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: '/pin.jpg',
  iconSize: [25, 41], // Tamaño del icono
  iconAnchor: [12, 41], // Anclaje del icono
  popupAnchor: [1, -34],
});

// Datos de las tiendas
const stores = [
  { id: 1, name: 'Tienda Santiago', position: [-33.49, -70.7] }, // Nueva York
  { id: 2, name: 'Tienda Valparaíso', position: [-33.05, -71.6] }, // Los Ángeles
];

const MapComponent = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

export default function Map() {
  return (
    <MapComponent center={[-33.49, -70.7]} zoom={10} style={{ height: '85vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {stores.map(store => (
        <Marker key={store.id} position={store.position}>
          <Popup>{store.name}</Popup>
        </Marker>
      ))}
    </MapComponent>
  );
}



