import type Point from './point'

export default class Segment {

  p0: Point
  p1: Point

  constructor (p0: Point, p1: Point) {
    this.p0 = p0
    this.p1 = p1
    if (p0.isSame(p1)) throw new Error('Duplicate point')
  }

  length () {
    return this.p0.distance(this.p1)
  }

}
