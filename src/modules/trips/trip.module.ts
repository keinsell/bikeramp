import { Module } from '@nestjs/common'

import { CreateTripService } from './commands/create-trip/create-trip.service'
import { TripRepository } from './trip.repository'
import { TripMapper } from './trip.mapper'
import { GeocodingService } from '../geocoding/geocoding.adapter'
import { GeocodeMapsGeocodingService } from '../geocoding/services/geocode-maps/geocode-maps.geocoding'
import { CreateTripController } from './commands/create-trip/create-trip.controller'
import { PrismaService } from '../../infrastructure/prisma/prisma.service'

@Module({
  imports: [],
  controllers: [CreateTripController],
  providers: [
    CreateTripService,
    TripRepository,
    TripMapper,
    PrismaService,
    { provide: GeocodingService, useClass: GeocodeMapsGeocodingService },
  ],
})
export class TripModule {}
