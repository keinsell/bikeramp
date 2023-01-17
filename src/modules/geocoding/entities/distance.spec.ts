import { Distance } from './distance'

describe('Distance', () => {
  it('should return distance in meters', () => {
    const distance = new Distance(1)
    expect(distance.toMeters()).toBe(1000)
  })

  it('should return distance in kilometers', () => {
    const distance = Distance.fromMeters(1000)
    expect(distance.baseScalar).toBe(1)
  })

  it('should return distance in kilometers', () => {
    const distance = Distance.fromMeters(1000)
    expect(distance.toString()).toBe('1.0km')
  })
})
