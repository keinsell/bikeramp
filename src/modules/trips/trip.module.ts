import { Module } from '@nestjs/common'

import { CreateTripService } from './commands/create-trip/create-trip.service'
import { TripRepository } from './trip.repository'
import { TripMapper } from './trip.mapper'
import { GeocodingService } from '../geocoding/geocoding.adapter'
import { GeocodeMapsGeocodingService } from '../geocoding/services/geocode-maps/geocode-maps.geocoding'
import { CreateTripController } from './commands/create-trip/create-trip.controller'
import { PrismaModule } from '../../infrastructure/prisma/prisma.module'
import { GeocodingModule } from '../geocoding/geocoding.module'

@Module({
  imports: [PrismaModule, GeocodingModule],
  controllers: [CreateTripController],
  providers: [CreateTripService, TripRepository, TripMapper],
  exports: [TripMapper, TripRepository],
})
export class TripModule {}
