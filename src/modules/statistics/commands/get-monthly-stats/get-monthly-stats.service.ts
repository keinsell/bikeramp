import { Usecase } from '../../../../common/domain/usecase/usecase'
import { TripRepository } from '../../../trips/trip.repository'
import { Injectable } from '@nestjs/common'
import { GetMonthlyStatsResponse } from './get-monthly-stats.response'
import { Formatter } from '../../../../utilities/formatter'
import { Money } from '../../../trips/entities/money'

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
        avg_price: Money.fromFloat(summarised.averagePrice).toString(),
      })
    })

    return response
  }
}
