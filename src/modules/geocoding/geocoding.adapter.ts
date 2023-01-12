import { Coordinates } from './entities/coordinates'

export abstract class GeocodingService {
  public abstract getCoordinates(address: string): Promise<Coordinates>
}
