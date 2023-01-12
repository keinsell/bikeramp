import { Test, TestingModule } from '@nestjs/testing'
import { CreateTripController } from './create-trip.controller'
import { CreateTripService } from './create-trip.service'
import { TripRepository } from '../../trip.repository'
import { TripMapper } from '../../trip.mapper'
import { PrismaService } from '../../../../infrastructure/prisma/prisma.service'
import { GeocodingService } from '../../../geocoding/geocoding.adapter'
import { GeocodeMapsGeocodingService } from '../../../geocoding/services/geocode-maps/geocode-maps.geocoding'

// TODO: Improve tests over this spec

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
  it('....', () => {
    expect(true).toBe(true)
  })
})
