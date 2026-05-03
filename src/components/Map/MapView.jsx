import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import DrawControls from './DrawControls.jsx'

export default function MapView({ zones, points, onUpdateZones, onUpdatePoints, selected, setSelected }) {
  // Simple container with 70/30 layout in CSS
  return (
    <div className="gp-map-wrap">
      <MapContainer center={[-33.3, -66.3383]} zoom={12} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='© OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Draw controls + dynamic layers are encapsulated in DrawControls */}
        <DrawControls zones={zones} points={points} onUpdateZones={onUpdateZones} onUpdatePoints={onUpdatePoints} setSelected={setSelected} selected={selected} />
      </MapContainer>
    </div>
  )
}
