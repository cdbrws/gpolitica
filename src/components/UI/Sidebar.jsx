import React from 'react'

export default function Sidebar({ zones, points, onSelectZone, onSelectPoint, selected }) {
  return (
    <aside className="gp-sidebar">
      <h3>Panel</h3>
      <section>
        <h4>Zonas</h4>
        <ul>
          {zones.map((z) => (
            <li key={z.id} onClick={() => onSelectZone(z)} className={selected?.id === z.id ? 'selected' : ''}>
              {z.nombre} - {z.estado}
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h4>Puntos</h4>
        <ul>
          {points.map((p) => (
            <li key={p.id} onClick={() => onSelectPoint(p)}>
              {p.nombre} - {p.tipo}
            </li>
          ))}
        </ul>
      </section>
    </aside>
  )
}
