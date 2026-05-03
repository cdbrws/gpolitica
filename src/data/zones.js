// Datos de ejemplo de Zonas
export default [
  {
    id: 'z1',
    nombre: 'Zona Norte',
    tipo: 'circuito',
    color: '#e74c3c',
    responsable: 'Ana S.',
    prioridad: 'alta',
    estado: 'activa',
    notas: 'Zona con alta densidad poblacional',
    polygon: [
      [40.43, -3.70],
      [40.43, -3.60],
      [40.50, -3.60],
      [40.50, -3.70],
      [40.43, -3.70],
    ],
    updatedAt: Date.now()
  },
  {
    id: 'z2',
    nombre: 'Zona Centro',
    tipo: 'barrio',
    color: '#f1c40f',
    responsable: '',
    prioridad: 'media',
    estado: 'pendiente',
    notas: '',
    polygon: [
      [40.42, -3.75],
      [40.42, -3.65],
      [40.46, -3.65],
      [40.46, -3.75],
      [40.42, -3.75],
    ],
    updatedAt: Date.now()
  }
]
