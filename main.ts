import Point from './class/point'
import Triangle from './class/triangle'
import { isRectangle } from './theorems/pythagore'

const triangleA = new Triangle(
  new Point(0,0),
  new Point(0,1),
  new Point(2,2)
)
const isTriangleARectangle = isRectangle(triangleA)
console.log({ isTriangleARectangle })

const triangleB = new Triangle(
  new Point(0,0),
  new Point(3,0),
  new Point(0,4)
)
const triangleBRectangle = isRectangle(triangleB)
console.log({ triangleBRectangle })
