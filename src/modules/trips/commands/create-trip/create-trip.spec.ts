import { Test, TestingModule } from '@nestjs/testing'
import { CreateTripController } from './create-trip.controller'
import { CreateTripService } from './create-trip.service'
import { TripRepository } from '../../trip.repository'
import { TripMapper } from '../../trip.mapper'
import { GeocodingService } from '../../../geocoding/geocoding.adapter'
import { GeocodeMapsGeocodingService } from '../../../geocoding/services/geocode-maps/geocode-maps.geocoding'
import { PrismaService } from '../../../../infrastructure/prisma/prisma.service'
import { CreateTripResponse } from './data-transfering/create-trip.response'

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

  it.todo('should return error when start address is not valid')
  it.todo('should return error when destination address is not valid')
  it.todo('should return error when price is not valid')
  it.todo('should create new trip in database')
})

describe('CreateTripService', () => {
  let createTripService: CreateTripService

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        CreateTripService,
        TripRepository,
        TripMapper,
        PrismaService,
        { provide: GeocodingService, useClass: GeocodeMapsGeocodingService },
      ],
    }).compile()

    createTripService = app.get<CreateTripService>(CreateTripService)
  })

  it.todo('should create new trip')
  it.todo('should throw error when start address is not valid')
  it.todo('should throw error when destination address is not valid')
})
