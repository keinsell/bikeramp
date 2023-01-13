import { Injectable } from '@nestjs/common'
import { Coordinates } from '../../entities/coordinates/coordinates'
import { GeocodingService } from '../../geocoding.adapter'
import got from 'got'
import { Result, ResultAsync, err, ok } from 'neverthrow'
import { InvalidAddressError } from '../../errors/invalid-address.error'

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
  public async getCoordinates(address: string): Promise<Result<Coordinates, InvalidAddressError>> {
    const response = await got(`https://geocode.maps.co/search?q=${address}`).json<[GeocodeMapsResponse?]>()

    const location = response[0]

    if (!location) {
      return err(new InvalidAddressError(`Address ${address} is invalid or does not exist.`))
    }

    const { lat, lon } = location

    if (!lat || !lon) {
      return err(new InvalidAddressError(`Address ${address} is invalid or does not exist.`))
    }

    return ok(new Coordinates(Number.parseFloat(lat), Number.parseFloat(lon)))
  }
}
