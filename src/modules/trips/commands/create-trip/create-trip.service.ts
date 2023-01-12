import { Injectable } from '@nestjs/common'
import { Usecase } from 'src/common/domain/usecase/usecase'
import { GeocodingService } from 'src/modules/geocoding/geocoding.adapter'
import { CreateTripResponse } from './create-trip.response'

@Injectable()
export class CreateTripService implements Usecase<any, CreateTripResponse> {
  constructor(private geocodingService: GeocodingService) {}

  execute(request: any): Promise<CreateTripResponse> {
    throw new Error('Method not implemented.')
  }
}
