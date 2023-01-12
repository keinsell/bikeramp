import { Injectable } from '@nestjs/common'
import { Coordinates } from '../../entities/coordinates'
import { GeocodingService } from '../../geocoding.adapter'
import got from 'got'

interface GeocodeMapsResponse {
  place_id: number
  licence: string
  powered_by: string
  osm_type: string
  osm_id: number
  boundingbox: string[]
  lat: string
  lon: string
  display_name: string
  class: string
  type: string
  importance: number
}

@Injectable()
export class GeocodeMapsGeocodingService extends GeocodingService {
  public async getCoordinates(address: string): Promise<Coordinates> {
    // https://geocode.maps.co/search?q=ul.+Kościuszki+1,+Warszawa
    // https://geocode.maps.co/search?q=%7Baddress%7D
    const response = await got(`https://geocode.maps.co/search?q=${address}`).json<GeocodeMapsResponse[]>()

    const { lat, lon } = response[0]

    if (!lat || !lon) {
      throw new Error('No coordinates found')
    }

    return new Coordinates(Number.parseInt(lat), Number.parseInt(lon))
  }
}
