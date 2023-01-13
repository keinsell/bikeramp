import { Module } from '@nestjs/common'
import { TripModule } from '../modules/trips/trip.module'
import { StatisticsModule } from '../modules/statistics/statistics.module'
import { PrismaModule } from '../infrastructure/prisma/prisma.module'
import { GeocodingModule } from '../modules/geocoding/geocoding.module'

@Module({
  imports: [TripModule, StatisticsModule, PrismaModule, GeocodingModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
