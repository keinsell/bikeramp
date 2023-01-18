import { instance, mock, when } from 'ts-mockito'
import { GetMonthlyStatsService } from './get-monthly-stats.service'
import { TripRepository } from '../../../trips/trip.repository'
import { Distance } from '../../../geocoding/entities/distance'
import { Money } from '../../../trips/entities/money'
import { Formatter } from '../../../../utilities/formatter'

describe('GetMonthlyStatsService', () => {
  let service: GetMonthlyStatsService
  let tripRepository: TripRepository

  const testingPayload = {
    date: new Date(),
  }

  beforeEach(() => {
    const mock__tripRepository = mock(TripRepository)

    // Mock save to return a Trip
    when(mock__tripRepository.getDistanceAndAveragePriceAndAverageDistanceFromTripsInThisMonth()).thenResolve([
      {
        day: testingPayload.date,
        totalDistance: 1,
        averageDistance: 1,
        averagePrice: 1,
      },
    ])

    tripRepository = instance(mock__tripRepository)

    service = new GetMonthlyStatsService(tripRepository)
  })

  it('should return monthly stats', async () => {
    const response = await service.execute()

    expect(response).toEqual([
      {
        day: Formatter.formatDateToMonthAndDayOfMonthFormat(testingPayload.date),
        total_distance: Distance.fromKilometers(1).toString(),
        avg_ride: Distance.fromKilometers(1).toString(),
        avg_price: Money.fromFloat(1).toString(),
      },
    ])
  })
})
