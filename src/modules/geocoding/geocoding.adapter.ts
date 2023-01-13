import { Result, ResultAsync } from 'neverthrow'
import { Coordinates } from './entities/coordinates'
import { InvalidAddressError } from './errors/invalid-address.error'

export abstract class GeocodingService {
  public abstract getCoordinates(address: string): Promise<Result<Coordinates, InvalidAddressError>>
}
