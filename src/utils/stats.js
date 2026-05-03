// Stats helper simple
export function summarize(zones, points) {
  const total = zones.length
  const critical = zones.filter(z => z.estado === 'crítica').length
  const covered = zones.filter(z => z.estado === 'cubierta').length
  const withoutResp = zones.filter(z => !z.responsable).length
  return { total, critical, covered, withoutResp }
}
