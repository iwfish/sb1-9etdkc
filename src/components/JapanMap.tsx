import React from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { Customer } from '../types';

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/japan/japan-prefectures.json";

interface JapanMapProps {
  customers: Customer[];
}

const JapanMap: React.FC<JapanMapProps> = ({ customers }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">顧客マップ</h2>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 1000,
          center: [137, 38]
        }}
        width={500}
        height={600}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map(geo => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#EAEAEC"
                stroke="#D6D6DA"
              />
            ))
          }
        </Geographies>
        {customers.map((customer) => (
          <Marker key={customer.id} coordinates={customer.coordinates}>
            <circle r={5} fill="#F00" stroke="#fff" strokeWidth={2} />
            <text
              textAnchor="middle"
              y={-10}
              style={{ fontFamily: "system-ui", fill: "#5D5A6D", fontSize: "8px" }}
            >
              {customer.name}
            </text>
          </Marker>
        ))}
      </ComposableMap>
    </div>
  );
};

export default JapanMap;