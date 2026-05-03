import React from 'react'

export default function RightPanel({ selected, zones, points }) {
  const renderZone = () => {
    if (!selected || selected.type !== 'zone') return <div>Selecciona una zona para ver detalles</div>
    const z = zones.find((zz) => zz.id === selected.id) || {}
    return (
      <div className="gp-panel-zone">
        <h3>Zona: {z.nombre}</h3>
        <p>ID: {z.id}</p>
        <p>Tipo: {z.tipo}</p>
        <p>Responsable: {z.responsable}</p>
        <p>Estado: {z.estado}</p>
        <p>Notas: {z.notas}</p>
      </div>
    )
  }
  const renderPoint = () => {
    if (!selected || selected.type !== 'point') return <div>Selecciona un punto para ver detalles</div>
    const p = points.find((pt) => pt.id === selected.id) || {}
    return (
      <div className="gp-panel-point">
        <h3>Punto: {p.nombre}</h3>
        <p>ID: {p.id}</p>
        <p>Tipo: {p.tipo}</p>
        <p>Zona: {p.zonaId}</p>
        <p>Estado: {p.estado}</p>
        <p>Notas: {p.notas}</p>
      </div>
    )
  }
  return (
    <aside className="gp-rightpanel">
      {selected?.type === 'zone' ? renderZone() : selected?.type === 'point' ? renderPoint() : <div>Detalles</div>}
    </aside>
  )
}
