import type Point from './point'

export default class Triangle {

  p0: Point
  p1: Point
  p2: Point

  constructor (p0: Point, p1: Point, p2: Point) {
    const allPoints = [p0, p1, p2]
    if (this.hasDuplicate(allPoints)) throw new Error('Duplicate point')
    this.p0 = p0
    this.p1 = p1
    this.p2 = p2
  }

  hasDuplicate (points: Point[]): boolean {
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        if (points[i].isSame(points[j])) {
          return true
        }
      }
    }
    return false
  }

}
