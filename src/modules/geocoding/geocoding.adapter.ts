import { Coordinates } from './entities/coordinates'
import { Distance } from './entities/distance'

export abstract class GeocodingService {
  public abstract getCoordinates(address: string): Promise<Coordinates>
}
