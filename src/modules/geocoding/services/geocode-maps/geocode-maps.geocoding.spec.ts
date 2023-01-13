import { GeocodeMapsGeocodingService } from './geocode-maps.geocoding'

describe('GeocodeMapsGeocodingService', () => {
  it('should be defined', () => {
    expect(new GeocodeMapsGeocodingService()).toBeDefined()
  })

  it('should return coordinates', async () => {
    const geocodeMapsGeocodingService = new GeocodeMapsGeocodingService()
    const response = await geocodeMapsGeocodingService.getCoordinates('ul.+Kościuszki+1,+Warszawa')

    expect(response.isOk()).toBe(true)
    expect(response.isErr()).toBe(false)
    expect(response.unwrapOr(undefined)).toBeDefined()
    expect(response.unwrapOr(undefined).latitude).toBe(52.24583935)
    expect(response.unwrapOr(undefined).longitude).toBe(21.2196323121396)
  })

  it('should return domain error', async () => {
    const geocodeMapsGeocodingService = new GeocodeMapsGeocodingService()
    const response = await geocodeMapsGeocodingService.getCoordinates('')

    expect(response.isOk()).toBe(false)
    expect(response.isErr()).toBe(true)
  })
})
