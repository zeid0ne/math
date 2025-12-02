import type Point from '../class/point'

export function distance (p0: Point, p1: Point) {
  const distanceX = Math.abs(p0.x - p1.x)
  const distanceY = Math.abs(p0.y - p1.y)
  return Math.sqrt(distanceX ** 2 + distanceY ** 2)
}
