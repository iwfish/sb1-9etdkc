import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon, Map as LeafletMap } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Customer, InventoryProperty } from '../types';

interface Map2DProps {
  customers: Customer[];
  inventory: InventoryProperty[];
  showInventory: boolean;
}

const Map2D: React.FC<Map2DProps> = ({ customers, inventory, showInventory }) => {
  const mapRef = useRef<LeafletMap | null>(null);

  const customerIcon = new Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const propertyIcon = new Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const notInInventoryIcon = new Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const inventoryIcon = new Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const center: [number, number] = [35.3614, 136.6205]; // 岐阜南地域の座標

  useEffect(() => {
    const blinkMarkers = () => {
      const markers = document.querySelectorAll('.leaflet-marker-icon');
      markers.forEach((marker) => {
        if (marker.classList.contains('not-in-inventory')) {
          marker.classList.toggle('blink');
        }
      });
    };

    const blinkInterval = setInterval(blinkMarkers, 500);

    return () => clearInterval(blinkInterval);
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView(center, 12);
    }
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">顧客マップ</h2>
      <MapContainer center={center} zoom={12} style={{ height: '600px', width: '100%' }} ref={mapRef}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {customers.map((customer) => (
          <React.Fragment key={customer.id}>
            <Marker position={customer.coordinates} icon={customerIcon}>
              <Popup>
                <strong>{customer.name}</strong><br />
                住所: {customer.address}
              </Popup>
            </Marker>
            <Marker 
              position={customer.propertyCoordinates} 
              icon={customer.isPropertyInInventory ? propertyIcon : notInInventoryIcon}
              className={customer.isPropertyInInventory ? '' : 'not-in-inventory'}
            >
              <Popup>
                <strong>{customer.name}の物件</strong><br />
                住所: {customer.propertyAddress}<br />
                状態: {customer.isPropertyInInventory ? '在庫あり' : '在庫なし'}
              </Popup>
            </Marker>
          </React.Fragment>
        ))}
        {showInventory && inventory.map((property) => (
          <Marker key={property.id} position={property.coordinates} icon={inventoryIcon}>
            <Popup>
              <strong>在庫物件</strong><br />
              住所: {property.address}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map2D;