import { Module } from '@nestjs/common'
import { GetWeeklyStatsService } from './commands/get-weekly-stats/get-weekly.stats.service'
import { GetWeeklyStatsController } from './commands/get-weekly-stats/get-weekly-stats.controller'
import { TripModule } from '../trips/trip.module'

@Module({
  imports: [TripModule],
  controllers: [GetWeeklyStatsController],
  providers: [GetWeeklyStatsService],
})
export class StatisticsModule {}
