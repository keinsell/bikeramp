import { Module } from '@nestjs/common'
import { GeocodingService } from './geocoding.adapter'
import { GeocodeMapsGeocodingService } from './services/geocode-maps/geocode-maps.geocoding'

@Module({
  imports: [],
  exports: [{ provide: GeocodingService, useClass: GeocodeMapsGeocodingService }],
  providers: [{ provide: GeocodingService, useClass: GeocodeMapsGeocodingService }],
})
export class GeocodingModule {}
