import React, { useEffect, useState } from 'react'
import MapView from '../components/Map/MapView.jsx'
import Sidebar from '../components/UI/Sidebar.jsx'
import Topbar from '../components/UI/Topbar.jsx'
import FiltersBar from '../components/UI/FiltersBar.jsx'
import { getZones, saveZones, getPoints, savePoints } from '../utils/storage.js'
import zonesMock from '../data/zones.js'
import pointsMock from '../data/points.js'
import RightPanel from '../components/UI/RightPanel.jsx'

export default function MapDashboard() {
  const [zones, setZones] = useState([])
  const [points, setPoints] = useState([])
  const [selected, setSelected] = useState({ type: null, id: null })

  // Initialize storage with mocks on first run
  useEffect(() => {
    const storedZones = getZones()
    if (!storedZones || storedZones.length === 0) {
      saveZones(zonesMock)
      setZones(zonesMock)
    } else {
      setZones(storedZones)
    }

    const storedPoints = getPoints()
    if (!storedPoints || storedPoints.length === 0) {
      savePoints(pointsMock)
      setPoints(pointsMock)
    } else {
      setPoints(storedPoints)
    }
  }, [])

  // Simple handlers to demonstrate interaction
  const onSelectZone = (zone) => setSelected({ type: 'zone', id: zone.id })
  const onSelectPoint = (pt) => setSelected({ type: 'point', id: pt.id })

  const updateZones = (updated) => {
    setZones(updated)
    saveZones(updated)
  }

  const updatePoints = (updated) => {
    setPoints(updated)
    savePoints(updated)
  }

  // Global event listeners for MVP actions from DrawControls
  useEffect(() => {
    const onPointAdded = (e) => {
      const pt = e.detail
      const updated = [ ...(points || []), pt ]
      setPoints(updated)
      savePoints(updated)
    }
    const onZoneAdded = (e) => {
      const z = e.detail
      const updated = [ ...(zones || []), z ]
      setZones(updated)
      saveZones(updated)
    }
    window.addEventListener('gp-point-added', onPointAdded)
    window.addEventListener('gp-zone-added', onZoneAdded)
    window.addEventListener('gp-zones-edited', (e) => {
      const updated = e.detail
      setZones(updated)
      saveZones(updated)
    })
    return () => {
      window.removeEventListener('gp-point-added', onPointAdded)
      window.removeEventListener('gp-zone-added', onZoneAdded)
    }
  }, [points, zones])

  return (
    <div className="gp-layout">
      <Topbar counts={{ zones: zones.length, points: points.length }} />
      <FiltersBar />
      <div className="gp-main">
        <div className="gp-leftcol">
          <Sidebar
            selected={selected}
            zones={zones}
            points={points}
            onSelectZone={onSelectZone}
            onSelectPoint={onSelectPoint}
          />
        </div>
        <div className="gp-mapcol">
          <MapView
            zones={zones}
            points={points}
            onUpdateZones={updateZones}
            onUpdatePoints={updatePoints}
            selected={selected}
            setSelected={setSelected}
          />
        </div>
        <RightPanel selected={selected} zones={zones} points={points} />
      </div>
      {/* Minimal Dashboard block as placeholder footer area */}
    </div>
  )
}
