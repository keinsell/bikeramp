import { Usecase } from '../../../../common/domain/usecase/usecase'
import { TripRepository } from '../../../trips/trip.repository'
import { GetWeeklyStatsResponse } from './get-weekly.stats.response'

export class GetWeeklyStatsService implements Usecase<undefined, GetWeeklyStatsResponse> {
  constructor(private tripRepository: TripRepository) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  execute(_request: undefined): Promise<GetWeeklyStatsResponse> {
    throw new Error('Method not implemented.')
  }
}
