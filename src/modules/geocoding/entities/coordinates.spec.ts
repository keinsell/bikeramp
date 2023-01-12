import { Coordinates } from './coordinates'

describe('Cordinates', () => {
  // Check calculation of distance between two points on Earth
  it('should return distance between two points on Earth', () => {
    const coordinates1 = new Coordinates(52.205, 0.119)
    const coordinates2 = new Coordinates(48.857, 2.351)

    const distance = coordinates1.getDistanceBetweenCoordinates(coordinates2)

    expect(distance.toMeters()).toBe(404279.1639886797)
    expect(distance.baseScalar).toBe(404.2791639886797)
  })
})
