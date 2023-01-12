import { Module } from '@nestjs/common'
import { AppController } from '../modules/trips/app.controller'
import { AppService } from '../modules/trips/app.service'
import { PrismaService } from '../infrastructure/prisma/prisma.service'
import { GeocodingService } from 'src/modules/geocoding/geocoding.adapter'
import { MockGeocodingService } from 'src/modules/geocoding/services/geocode-maps/geocode-maps.geocoding'

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PrismaService, { provide: GeocodingService, useClass: MockGeocodingService }],
})
export class AppModule {}
