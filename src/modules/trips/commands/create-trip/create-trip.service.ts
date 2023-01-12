import { Injectable } from '@nestjs/common'
import { Usecase } from 'src/common/domain/usecase/usecase'
import { GeocodingService } from 'src/modules/geocoding/geocoding.adapter'
import { CreateTripResponse } from './create-trip.response'
import { TripRepository } from '../../trip.repository'
import { CreateTripRequest } from './create-trip.request'

@Injectable()
export class CreateTripService implements Usecase<CreateTripRequest, CreateTripResponse> {
  constructor(private geocodingService: GeocodingService, private tripRepository: TripRepository) {}

  execute(request: CreateTripRequest): Promise<CreateTripResponse> {
    console.log(request)
    throw new Error('Method not implemented.')
  }
}
