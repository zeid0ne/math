import Triangle from './class/triangle'

console.log(Triangle.getTriangleFromDistances([2,4,5]).isRectangle())
console.log(Triangle.getTriangleFromDistances([3,4,5]).isRectangle())

console.log(Triangle.getTriangleFromDistances([2,4,5]).isIsocele())
console.log(Triangle.getTriangleFromDistances([2,4,4]).isIsocele())

console.log(Triangle.getTriangleFromDistances([4,4,5]).isEquilateral())
console.log(Triangle.getTriangleFromDistances([4,4,4]).isEquilateral())

