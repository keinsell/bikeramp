import { Injectable } from '@nestjs/common'
import { GeocodingService } from '../../../../modules/geocoding/geocoding.adapter'
import { CreateTripResponse } from './data-transfering/create-trip.response'
import { TripRepository } from '../../trip.repository'
import { CreateTripRequest } from './data-transfering/create-trip.request'
import { Trip } from '../../trip.entity'
import { Usecase } from '../../../../common/domain/usecase/usecase'
import { InvalidAddressError } from '../../../geocoding/errors/invalid-address.error'
import { Result, err, ok } from 'neverthrow'
import { Coordinates } from '../../../geocoding/entities/coordinates'
import { Money } from '../../entities/money'

@Injectable()
export class CreateTripService implements Usecase<CreateTripRequest, Result<CreateTripResponse, InvalidAddressError>> {
  constructor(private geocodingService: GeocodingService, private tripRepository: TripRepository) {}

  async execute(request: CreateTripRequest): Promise<Result<CreateTripResponse, InvalidAddressError>> {
    const coordinatedOfStartingPointRequest = await this.geocodingService.getCoordinates(request.start_address)
    const coordinatedOfDestinationPointRequest = await this.geocodingService.getCoordinates(request.destination_address)

    let coordinatedOfStartingPoint: Coordinates
    let coordinatedOfDestinationPoint: Coordinates

    if (coordinatedOfStartingPointRequest.isErr()) {
      return err(coordinatedOfStartingPointRequest.error)
    } else {
      coordinatedOfStartingPoint = coordinatedOfStartingPointRequest.value
    }

    if (coordinatedOfDestinationPointRequest.isErr()) {
      return err(coordinatedOfDestinationPointRequest.error)
    } else {
      coordinatedOfDestinationPoint = coordinatedOfDestinationPointRequest.value
    }

    const distance = coordinatedOfStartingPoint.getDistanceBetweenCoordinates(coordinatedOfDestinationPoint)

    const price = Money.fromFloat(request.price)

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

    return ok({
      id: trip.id,
      startAddress: trip.properties.startAddress,
      endAddress: trip.properties.endAddress,
      price: trip.properties.price.toString(),
      date: trip.properties.date,
      distance: trip.properties.distance.toString(),
    })
  }
}
