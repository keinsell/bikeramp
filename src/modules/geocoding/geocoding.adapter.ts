import { Result, ResultAsync } from 'neverthrow'
import { Coordinates } from './entities/coordinates'
import { InvalidAddressError } from './errors/invalid-address.error'

/**
 * Geocoding is a service which is supposed to get coordinates from provided address string with `getCoordinates()` method.

Implementations to `GeocodingService` adapter contained in `geocoding.adapter.ts` are contained in `services` directory.

Remember to choose implementation and reconnect it in `application/app.module.ts`.

```ts
@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PrismaService, { provide: GeocodingService, useClass: MockGeocodingService }],
})
export class AppModule {}
```
 */
export abstract class GeocodingService {
  public abstract getCoordinates(address: string): Promise<Result<Coordinates, InvalidAddressError>>
}
