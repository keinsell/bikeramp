import { Injectable } from '@nestjs/common'
import { GeocodingService } from '../../../../modules/geocoding/geocoding.adapter'
import { CreateTripResponse } from './data-transfering/create-trip.response'
import { TripRepository } from '../../trip.repository'
import { CreateTripRequest } from './data-transfering/create-trip.request'
import { Trip } from '../../trip.entity'
import { dinero } from 'dinero.js'
import { PLN } from '@dinero.js/currencies'
import { Usecase } from '../../../../common/domain/usecase/usecase'
import { Formatter } from '../../../../utilities/formatter'

@Injectable()
export class CreateTripService implements Usecase<CreateTripRequest, CreateTripResponse> {
  constructor(private geocodingService: GeocodingService, private tripRepository: TripRepository) {}

  async execute(request: CreateTripRequest): Promise<CreateTripResponse> {
    // TODO: These services can throw, add neverthrow library to use left/right responses
    const coordinatedOfStartingPoint = await this.geocodingService.getCoordinates(request.start_address)
    const coordinatedOfDestinationPoint = await this.geocodingService.getCoordinates(request.destination_address)

    const distance = coordinatedOfStartingPoint.getDistanceBetweenCoordinates(coordinatedOfDestinationPoint)

    const price = dinero({ amount: request.price * 100, currency: PLN })

    let trip = new Trip({
      startAddress: request.start_address,
      endAddress: request.destination_address,
      price: price,
      date: new Date(request.date),
      distance: distance,
      startCoordinates: coordinatedOfStartingPoint,
      endCoordinates: coordinatedOfDestinationPoint,
    })

    trip = await this.tripRepository.save(trip)

    return {
      id: trip.id,
      startAddress: trip.properties.startAddress,
      endAddress: trip.properties.endAddress,
      price: Formatter.formatFiat(trip.properties.price.toJSON().amount / 100),
      date: trip.properties.date,
      distance: trip.properties.distance.toString(),
    }
  }
}
