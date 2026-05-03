import React from 'react'

export default function ZoneForm() {
  return (
    <form>
      <h3> Nueva Zona </h3>
      <input placeholder="Nombre" />
      <select>
        <option>circuito</option>
        <option>barrio</option>
      </select>
      <textarea placeholder="Notas" />
    </form>
  )
}
