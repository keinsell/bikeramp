import { GeocodeMapsGeocodingService } from './geocode-maps.geocoding'

describe('GeocodeMapsGeocodingService', () => {
  it('should be defined', () => {
    expect(new GeocodeMapsGeocodingService()).toBeDefined()
  })

  it('should return coordinates', async () => {
    const geocodeMapsGeocodingService = new GeocodeMapsGeocodingService()
    const coordinates = await geocodeMapsGeocodingService.getCoordinates('ul.+Kościuszki+1,+Warszawa')
    expect(coordinates).toBeDefined()
  })

  it('should throw error', async () => {
    const geocodeMapsGeocodingService = new GeocodeMapsGeocodingService()
    await expect(geocodeMapsGeocodingService.getCoordinates('')).rejects.toThrow()
  })
})
