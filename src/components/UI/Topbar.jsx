import React from 'react'

export default function Topbar({ counts }) {
  return (
    <header className="gp-topbar">
      <div className="gp-kpi">Zonas: {counts.zones}</div>
      <div className="gp-kpi">Puntos: {counts.points}</div>
    </header>
  )
}
