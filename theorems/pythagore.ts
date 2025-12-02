import type Triangle from '../class/triangle'
import { distance } from '../relations/distance'

export function isRectangle (triangle: Triangle) {
  const distanceAB = distance(triangle.p0, triangle.p1)
  const distanceBC = distance(triangle.p1, triangle.p2)
  const distanceAC = distance(triangle.p2, triangle.p0)
  const allDistances = [distanceAB, distanceBC, distanceAC]
  const hypothenuse = Math.max(...allDistances)
  const invalidHypothenuse = allDistances.filter(x => x === hypothenuse).length !== 1
  if (invalidHypothenuse) return false
  const otherDistances = allDistances.filter(d => d !== hypothenuse)
  const otherDistance1Squared = otherDistances[0] ** 2
  const otherDistance2Squared = otherDistances[1] ** 2
  const hypothenuseSquared = hypothenuse ** 2
  return otherDistance1Squared + otherDistance2Squared === hypothenuseSquared
}
