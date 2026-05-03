import React from 'react'

export default function PointForm() {
  return (
    <form>
      <h3> Nuevo Punto </h3>
      <input placeholder="Nombre" />
      <select>
        <option>escuela</option>
        <option>referente</option>
        <option>local</option>
      </select>
      <textarea placeholder="Notas" />
    </form>
  )
}
