import { Entity } from '../../common/domain/entity'
import { Coordinates } from '../geocoding/entities/coordinates'
import { Distance } from '../geocoding/entities/distance'
import { Money } from './entities/money'

interface TripProperties {
  startAddress: string
  endAddress: string
  price: Money
  date: Date
  distance?: Distance
  startCoordinates?: Coordinates
  endCoordinates?: Coordinates
}

export class Trip extends Entity<TripProperties> {
  constructor(props: TripProperties, id?: string) {
    super(props, id)
  }
}
