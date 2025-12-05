import Point from './point'

export default class Triangle {

  p0: Point
  p1: Point
  p2: Point

  static getTriangleFromDistances (distances: number[]) {
    if (distances.length !== 3) throw new Error('A triangle must have 3 points')
    const [a, b, c] = distances
    // Place p0 at (0,0), p1 at (c,0)
    const p0 = new Point(0, 0)
    const p1 = new Point(c, 0)
    // Find p2 using law of cosines
    // a = distance p1-p2, b = distance p0-p2, c = distance p0-p1
    // p2 = (x, y)
    // |p2 - p0| = b => sqrt(x^2 + y^2) = b
    // |p2 - p1| = a => sqrt((x-c)^2 + y^2) = a
    // Solve for x:
    // (x-c)^2 + y^2 = a^2
    // x^2 + y^2 = b^2
    // Expand first: x^2 - 2cx + c^2 + y^2 = a^2
    // Substitute y^2 = b^2 - x^2:
    // x^2 - 2cx + c^2 + (b^2 - x^2) = a^2
    // -2cx + c^2 + b^2 = a^2
    // -2cx = a^2 - b^2 - c^2
    // x = (c^2 + b^2 - a^2) / (2c)
    const x = (c ** 2 + b ** 2 - a ** 2) / (2 * c)
    const ySquared = b ** 2 - x ** 2
    if (ySquared < 0) throw new Error('Impossible triangle side lengths')
    const y = Math.sqrt(ySquared)
    const p2 = new Point(x, y)
    return new Triangle([p0, p1, p2])
  }

  constructor (points: Point[]) {
    if (points.length !== 3) throw new Error('A triangle must have 3 points')
    if (this.hasDuplicate(points)) throw new Error('Duplicate point')
    this.p0 = points[0]
    this.p1 = points[1]
    this.p2 = points[2]
  }

  private hasDuplicate (points: Point[]): boolean {
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        if (points[i].isSame(points[j])) {
          return true
        }
      }
    }
    return false
  }

  private allDistances () {
    const distanceAB = this.p0.distance(this.p1)
    const distanceBC = this.p1.distance(this.p2)
    const distanceAC = this.p2.distance(this.p0)
    return [distanceAB, distanceBC, distanceAC]
  }

  isRectangle () {
    const allDistances = this.allDistances()
    const hypothenuse = Math.max(...allDistances)
    const invalidHypothenuse = allDistances.filter(x => x === hypothenuse).length !== 1
    if (invalidHypothenuse) return false
    const otherDistances = allDistances.filter(d => d !== hypothenuse)
    const otherDistance1Squared = otherDistances[0] ** 2
    const otherDistance2Squared = otherDistances[1] ** 2
    const hypothenuseSquared = hypothenuse ** 2
    return otherDistance1Squared + otherDistance2Squared === hypothenuseSquared
  }

  private equal (a: number, b: number, epsilon = 1e-9): boolean {
    return Math.abs(a - b) < epsilon
  }

  isIsocele () {
    const checkedDistances: number[] = []
    for (const distance of this.allDistances()) {
      if (checkedDistances.some(cd => this.equal(cd,distance))) return true
      checkedDistances.push(distance)
    }
    return false
  }

  isEquilateral () {
    let firstDistance: number | null = null
    for (const distance of this.allDistances()) {
      if (firstDistance === null) {
        firstDistance = distance
      } else if (!this.equal(firstDistance, distance)) {
        return false
      }
    }
    return true
  }

}
