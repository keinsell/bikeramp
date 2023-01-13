import { dinero, toDecimal } from 'dinero.js'
import { Usecase } from '../../../../common/domain/usecase/usecase'
import { Distance } from '../../../geocoding/entities/distance'
import { TripRepository } from '../../../trips/trip.repository'
import { GetWeeklyStatsResponse } from './get-weekly.stats.response'
import { PLN } from '@dinero.js/currencies'
import { Injectable } from '@nestjs/common'
import { Formatter } from '../../../../utilities/formatter'

@Injectable()
export class GetWeeklyStatsService implements Usecase<undefined, GetWeeklyStatsResponse> {
  constructor(private tripRepository: TripRepository) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(request: undefined): Promise<GetWeeklyStatsResponse> {
    const { distance, price } = await this.tripRepository.getDistanceAndPriceFromTripsInThisWeek()

    return {
      total_distance: new Distance(distance).toString(),
      total_price: Formatter.formatFiat(price),
    }
  }
}
