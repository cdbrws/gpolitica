import React, { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet-draw'

export default function DrawControls({ zones, onUpdateZones, onUpdatePoints, setSelected, selected }) {
  const map = useMap()

  useEffect(() => {
    if (!map) return

    // Layer for zones
    let zonesLayer = new L.FeatureGroup()
    map.addLayer(zonesLayer)

    // Render existing zones from props
    if (zones && zones.length) {
      zones.forEach((z) => {
        if (z.polygon && z.polygon.length) {
          const latlngs = z.polygon.map((p) => [p[0], p[1]])
          const poly = L.polygon(latlngs, { color: z.color || '#3388ff', weight: 2 })
          poly.zoneId = z.id
          poly.addTo(zonesLayer)
          poly.on('click', () => setSelected({ type: 'zone', id: z.id }))
        }
      })
    }

    // Draw controls
    const drawControl = new L.Control.Draw({
      draw: {
        marker: false,
        polyline: false,
        rectangle: false,
        circle: false,
        polygon: true
      },
      edit: { featureGroup: zonesLayer }
    })
    map.addControl(drawControl)

    map.on(L.Draw.Event.CREATED, (e) => {
      const layer = e.layer
      const latlngs = layer.getLatLngs ? layer.getLatLngs()[0] : []
      const coordinates = latlngs.map((pt) => [pt.lat, pt.lng])
      const zone = {
        id: 'z_' + Math.random().toString(36).slice(2, 9),
        nombre: 'Nueva Zona',
        tipo: 'circuito',
        color: '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'),
        responsable: '',
        prioridad: 'media',
        estado: 'pendiente',
        notas: '',
        polygon: coordinates,
        updatedAt: Date.now()
      }
      layer.zoneId = zone.id
      layer.addTo(zonesLayer)
      layer.on('click', () => setSelected({ type: 'zone', id: zone.id }))
      // Persist via global hook
      window.__GP_ZONES__ = [zone]
      const evt = new CustomEvent('gp-zone-added', { detail: zone })
      window.dispatchEvent(evt)
    })

    map.on(L.Draw.Event.EDITED, () => {
      const layers = zonesLayer.getLayers()
      const updated = layers.map((layer) => {
        const id = layer.zoneId
        const latlngs = layer.getLatLngs ? layer.getLatLngs()[0] : []
        const coords = latlngs.map((pt) => [pt.lat, pt.lng])
        return { id, polygon: coords }
      }).filter(Boolean)
      window.__GP_ZONES__ = updated
      const evt = new CustomEvent('gp-zones-edited', { detail: updated })
      window.dispatchEvent(evt)
    })
    // MVP: add a point on map click to seed data
    map.on('click', (e) => {
      const { lat, lng } = e.latlng
      const pt = {
        id: 'pt_' + Math.random().toString(36).slice(2, 9),
        nombre: 'Punto ' + new Date().toLocaleTimeString(),
        tipo: 'local',
        lat,
        lng,
        zonaId: '',
        responsable: '',
        estado: 'pendiente',
        notas: ''
      }
      window.__GP_POINTS__ = [pt]
      const evt = new CustomEvent('gp-point-added', { detail: pt })
      window.dispatchEvent(evt)
    })
  }, [map, zones, setSelected])

  return null
}
