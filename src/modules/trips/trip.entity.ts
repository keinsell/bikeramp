import { Entity } from '../../common/domain/entity'
import { Coordinates } from '../geocoding/entities/coordinates/coordinates'
import { Distance } from '../geocoding/entities/distance'
import { Dinero } from 'dinero.js'

interface TripProperties {
  startAddress: string
  endAddress: string
  price: Dinero<number>
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
