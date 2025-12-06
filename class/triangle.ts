import Point from './point'

export default class Triangle {

  p0: Point
  p1: Point
  p2: Point

  static getTriangleFromDistances (distances: number[]) {
    if (distances.length !== 3) throw new Error('A triangle requires exactly 3 distances')
    if (distances.some(d => d <= 0)) throw new Error('All distances must be positive')
    const [a, b, c] = distances
    // Check triangle inequality: sum of any two sides must be greater than the third side
    if (a + b <= c || a + c <= b || b + c <= a) {
      throw new Error('Triangle inequality violation: these distances cannot form a valid triangle')
    }
    // Create points to form a triangle with the given distances
    // We'll place the triangle in a coordinate system for convenience
    // p0 at origin (0, 0)
    const p0 = new Point(0, 0)

    // p1 along x-axis at distance a from p0
    const p1 = new Point(a, 0)

    // Calculate p2 using law of cosines
    // We need to find coordinates (x, y) for p2 such that:
    // distance(p0, p2) = b
    // distance(p1, p2) = c

    // Using the law of cosines:
    // c² = a² + b² - 2ab*cos(γ)
    // where γ is the angle at p0
    const cosGamma = (a * a + b * b - c * c) / (2 * a * b)

    // Validate cosine value is within [-1, 1] (should be due to triangle inequality)
    if (Math.abs(cosGamma) > 1) {
      // This shouldn't happen if triangle inequality is satisfied,
      // but handle floating point precision issues
      throw new Error('Invalid triangle configuration')
    }

    const sinGamma = Math.sqrt(1 - cosGamma * cosGamma)

    // Calculate coordinates of p2
    const x = b * cosGamma
    const y = b * sinGamma
    const p2 = new Point(x, y)

    // Create and return the triangle
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

  allDistances () {
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
