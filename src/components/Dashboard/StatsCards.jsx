import React from 'react'

export default function StatsCards({ data }) {
  return (
    <div className="gp-stats">
      <div className="card">Zonas: {data?.zones ?? 0}</div>
      <div className="card">Críticas: {data?.critical ?? 0}</div>
      <div className="card">Cubiertas: {data?.covered ?? 0}</div>
    </div>
  )
}
