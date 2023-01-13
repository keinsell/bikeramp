import { dinero, toDecimal } from 'dinero.js'
import { Usecase } from '../../../../common/domain/usecase/usecase'
import { Distance } from '../../../geocoding/entities/distance/distance'
import { TripRepository } from '../../../trips/trip.repository'
import { PLN } from '@dinero.js/currencies'
import { Injectable } from '@nestjs/common'
import { GetMonthlyStatsResponse } from './get-monthly-stats.response'
import { Formatter } from '../../../../utilities/formatter'

@Injectable()
export class GetMonthlyStatsService implements Usecase<undefined, GetMonthlyStatsResponse[]> {
  constructor(private tripRepository: TripRepository) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(): Promise<GetMonthlyStatsResponse[]> {
    const summarised = await this.tripRepository.getDistanceAndAveragePriceAndAverageDistanceFromTripsInThisMonth()

    const response: GetMonthlyStatsResponse[] = []

    summarised.map((summarised) => {
      response.push({
        day: Formatter.formatDateToMonthAndDayOfMonthFormat(summarised.day),
        total_distance: Formatter.formatDistance(summarised.totalDistance),
        avg_ride: Formatter.formatDistance(summarised.averageDistance),
        avg_price: Formatter.formatFiat(summarised.averagePrice),
      })
    })

    return response
  }
}
