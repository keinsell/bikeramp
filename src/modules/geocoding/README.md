# `geocoding`

Geocoding is a service which is supposed to get coordinates from provided address string with `getCoordinates()` method,
additionally service should be able to calculate distance between coordinates by `getDistanceBetweenCoordinates()`
method.

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
