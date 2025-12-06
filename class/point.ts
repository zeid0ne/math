export default class Point {

  x: number
  y: number

  constructor (x: number, y: number) {
    this.x = x
    this.y = y
  }

  isSame (p: Point) {
    return p.x === this.x && p.y === this.y
  }

  distance (p1: Point) {
    const distanceX = this.x - p1.x
    const distanceY = this.y - p1.y
    return Math.sqrt(distanceX ** 2 + distanceY ** 2)
  }

}
