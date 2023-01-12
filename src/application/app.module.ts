import { Module } from '@nestjs/common'
import { PrismaService } from '../infrastructure/prisma/prisma.service'
import { GeocodingService } from '../modules/geocoding/geocoding.adapter'
import { GeocodeMapsGeocodingService } from '../modules/geocoding/services/geocode-maps/geocode-maps.geocoding'
import { TripModule } from '../modules/trips/trip.module'

@Module({
  imports: [TripModule],
  controllers: [],
  providers: [PrismaService, { provide: GeocodingService, useClass: GeocodeMapsGeocodingService }],
})
export class AppModule {}
