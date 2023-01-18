// ? In my opinion it's better to use a class instead returning simple number from service, we'll have a nice set of function for converting distance to meters and back. This is a good example of using value objects. Based from functional example from other project: https://github.com/keinsell/neuronek/blob/9c48ddb0be0eb4500eea98a10a12d2b899fcaaa7/packages/common/src/utilities/mass-unit/mass-unit.ts
// I do not like to overuse DDD concepts in this application as due to project size, adding uneccessary complexity is not worth it.

/**
 * Distance is value object that represents distance between two points on Earth. It's based on kilometer unit.
 */
export class Distance {
  constructor(/** baseScalar is scalar of kilometer unit. */ public baseScalar: number) {
    this.baseScalar = baseScalar
  }

  toString() {
    return `${this.baseScalar.toFixed(1)}km`
  }

  toMeters() {
    return this.baseScalar * 1000
  }

  static fromMeters(meters: number) {
    return new Distance(meters / 1000)
  }

  static fromKilometers(kilometers: number) {
    return new Distance(kilometers)
  }
}
