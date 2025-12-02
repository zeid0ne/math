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
}
