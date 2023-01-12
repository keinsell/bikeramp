import { Injectable } from '@nestjs/common'
import { GeocodingService } from 'src/modules/geocoding/geocoding.adapter'

@Injectable()
export class CreateTripService {
  constructor(private geocodingService: GeocodingService) {}

  getHello(): string {
    return 'Hello World!'
  }
}
