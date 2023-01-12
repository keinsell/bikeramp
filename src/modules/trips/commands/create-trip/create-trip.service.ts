import { Injectable } from '@nestjs/common'
import { Usecase } from 'src/common/domain/usecase/usecase'
import { GeocodingService } from 'src/modules/geocoding/geocoding.adapter'
import { CreateTripResponse } from './create-trip.response'
import { TripRepository } from '../../trip.repository'
import { CreateTripRequest } from './create-trip.request'
import { Trip } from '../../trip.entity'
import { dinero, toDecimal } from 'dinero.js'
import { PLN } from '@dinero.js/currencies'

@Injectable()
export class CreateTripService implements Usecase<CreateTripRequest, CreateTripResponse> {
  constructor(private geocodingService: GeocodingService, private tripRepository: TripRepository) {}

  async execute(request: CreateTripRequest): Promise<CreateTripResponse> {
    const coordinatedOfStartingPoint = await this.geocodingService.getCoordinates(request.start_address)
    const coordinatedOfDestinationPoint = await this.geocodingService.getCoordinates(request.destination_address)

    const distance = coordinatedOfDestinationPoint.getDistanceBetweenCoordinates(coordinatedOfDestinationPoint)
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

    // trip = await this.tripRepository.save(trip)

    const formattedPrice = toDecimal(trip.properties.price, ({ value, currency }) => `${currency.code} ${value}`) // "USD 50.00"

    return {
      id: trip.id,
      startAddress: trip.properties.startAddress,
      endAddress: trip.properties.endAddress,
      price: formattedPrice,
      date: trip.properties.date,
      distance: trip.properties.distance.toString(),
    }
  }
}
