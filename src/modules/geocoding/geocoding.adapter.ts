import { Result, ResultAsync } from 'neverthrow'
import { Coordinates } from './entities/coordinates'
import { InvalidAddressError } from './errors/invalid-address.error'

/**
 * Geocoding is a service which is supposed to get coordinates from provided address string with `getCoordinates()` method.

Implementations to `GeocodingService` adapter contained in `geocoding.adapter.ts` are contained in `services` directory.

Remember to choose implementation and reconnect it in `geocoding.module.ts`.

```ts
@Module({
  imports: [],
  exports: [{ provide: GeocodingService, useClass: GeocodeMapsGeocodingService }],
  providers: [{ provide: GeocodingService, useClass: GeocodeMapsGeocodingService }],
})
export class GeocodingModule {}
```
 */
export abstract class GeocodingService {
  public abstract getCoordinates(address: string): Promise<Result<Coordinates, InvalidAddressError>>
}
