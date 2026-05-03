// Persistencia en LocalStorage para MVP
const ZONES_KEY = 'GP_ZONES_V1'
const POINTS_KEY = 'GP_POINTS_V1'

export const getZones = () => {
  try {
    const raw = localStorage.getItem(ZONES_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export const saveZones = (zones) => {
  localStorage.setItem(ZONES_KEY, JSON.stringify(zones))
}

export const getPoints = () => {
  try {
    const raw = localStorage.getItem(POINTS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export const savePoints = (points) => {
  localStorage.setItem(POINTS_KEY, JSON.stringify(points))
}
