import { Test, TestingModule } from '@nestjs/testing'
import { CreateTripController } from './create-trip.controller'
import { CreateTripService } from './create-trip.service'
import { TripRepository } from '../../trip.repository'
import { TripMapper } from '../../trip.mapper'
import { PrismaService } from '../../../../infrastructure/prisma/prisma.service'
import { GeocodingService } from '../../../geocoding/geocoding.adapter'
import { GeocodeMapsGeocodingService } from '../../../geocoding/services/geocode-maps/geocode-maps.geocoding'
import { Coordinates } from '../../../geocoding/entities/coordinates'
import { Money } from '../../entities/money'
import { anything, instance, mock, when } from 'ts-mockito'
import { ok } from 'neverthrow'
import { Trip } from '../../trip.entity'

describe('CreateTripController', () => {
  let appController: CreateTripController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CreateTripController],
      providers: [
        CreateTripService,
        TripRepository,
        TripMapper,
        PrismaService,
        { provide: GeocodingService, useClass: GeocodeMapsGeocodingService },
      ],
    }).compile()

    appController = app.get<CreateTripController>(CreateTripController)
  })

  describe('root', () => {
    it('should return "Hello World!"', async () => {
      expect(
        await appController.executeImplementation({
          start_address: 'Plac Europejski 2, Warszawa, Polska',
          destination_address: 'Kraków, Polska',
          price: 1000,
          date: new Date(),
        }),
      )
    })
  })
})

describe('CreateTripService', () => {
  let service: CreateTripService
  let geocodingService: GeocodingService
  let tripRepository: TripRepository

  const serviceRequest = {
    start_address: 'start_address',
    destination_address: 'destination_address',
    price: 10,
    date: new Date(),
  }

  beforeEach(() => {
    const mock__geocodingService = mock(GeocodeMapsGeocodingService)
    const mock__tripRepository = mock(TripRepository)

    // Mock start_address to Coordinates(1, 2)
    when(mock__geocodingService.getCoordinates('start_address')).thenResolve(ok(new Coordinates(1, 2)))
    // Mock destination_address to Coordinates(3, 4)
    when(mock__geocodingService.getCoordinates('destination_address')).thenResolve(ok(new Coordinates(3, 4)))

    // Mock save to return a Trip
    when(mock__tripRepository.save(anything())).thenResolve(
      new Trip(
        {
          startAddress: serviceRequest.start_address,
          endAddress: serviceRequest.destination_address,
          price: Money.fromFloat(serviceRequest.price),
          date: new Date(serviceRequest.date),
          distance: new Coordinates(1, 2).getDistanceBetweenCoordinates(new Coordinates(3, 4)),
        },
        '1',
      ),
    )

    geocodingService = instance(mock__geocodingService)
    tripRepository = instance(mock__tripRepository)

    service = new CreateTripService(geocodingService, tripRepository)
  })

  it('should create a trip', async () => {
    const response = await service.execute(serviceRequest)

    expect(response._unsafeUnwrap()).toEqual({
      id: '1',
      startAddress: serviceRequest.start_address,
      endAddress: serviceRequest.destination_address,
      price: '10.00PLN',
      date: new Date(serviceRequest.date),
      distance: new Coordinates(1, 2).getDistanceBetweenCoordinates(new Coordinates(3, 4)).toString(),
    })
  })
})
