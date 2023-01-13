import { Module } from '@nestjs/common'
import { PrismaService } from '../infrastructure/prisma/prisma.service'
import { GeocodingService } from '../modules/geocoding/geocoding.adapter'
import { GeocodeMapsGeocodingService } from '../modules/geocoding/services/geocode-maps/geocode-maps.geocoding'
import { TripModule } from '../modules/trips/trip.module'
import { StatisticsModule } from '../modules/statistics/statistics.module'
import { TripRepository } from '../modules/trips/trip.repository'
import { TripMapper } from '../modules/trips/trip.mapper'

@Module({
  imports: [TripModule, StatisticsModule],
  controllers: [],
  providers: [
    PrismaService,
    { provide: GeocodingService, useClass: GeocodeMapsGeocodingService },
    TripRepository,
    TripMapper,
  ],
})
export class AppModule {}
