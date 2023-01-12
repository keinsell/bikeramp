import { Module } from '@nestjs/common'
import { PrismaService } from 'src/infrastructure/prisma/prisma.service'
import { GeocodingService } from 'src/modules/geocoding/geocoding.adapter'
import { GeocodeMapsGeocodingService } from 'src/modules/geocoding/services/geocode-maps/geocode-maps.geocoding'
import { CreateTripController } from 'src/modules/trips/commands/create-trip/create-trip.controller'
import { CreateTripService } from './commands/create-trip/create-trip.service'
import { TripRepository } from './trip.repository'
import { TripMapper } from './trip.mapper'

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