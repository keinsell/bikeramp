import { Distance } from './distance'

// ? In my opinion it's better to use a class instead returning simple number from service, we'll have a nice set of function for converting distance to meters and back. This is a good example of using value objects. Based from functional example from other project: https://github.com/keinsell/neuronek/blob/9c48ddb0be0eb4500eea98a10a12d2b899fcaaa7/packages/common/src/utilities/mass-unit/mass-unit.ts
// I do not like to overuse DDD concepts in this application as due to project size, adding uneccessary complexity is not worth it. Nobody should know DDD to know what's happening in the code.

export class Coordinates {
  public static fromString(coordinates: string): Coordinates {
    const [latitude, longitude] = coordinates.split(',').map((coordinate) => parseFloat(coordinate))

    return new Coordinates(latitude, longitude)
  }

  public readonly latitude: number
  public readonly longitude: number

  constructor(latitude: number, longitude: number) {
    this.latitude = latitude
    this.longitude = longitude
  }

  public toString(): string {
    return `${this.latitude},${this.longitude}`
  }

  /** Returns `Distance` class from two provided `Coordinates` objects. */
  getDistanceBetweenCoordinates(coordinates: Coordinates): Distance {
    const { latitude: lat1, longitude: lon1 } = this
    const { latitude: lat2, longitude: lon2 } = coordinates

    // Haversine formula
    // https://en.wikipedia.org/wiki/Haversine_formula

    const R = 6371e3 // metres
    const φ1 = (lat1 * Math.PI) / 180 // φ, λ in radians
    const φ2 = (lat2 * Math.PI) / 180
    const Δφ = ((lat2 - lat1) * Math.PI) / 180
    const Δλ = ((lon2 - lon1) * Math.PI) / 180

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    const d = R * c // in metres

    return Distance.fromMeters(d)
  }
}
