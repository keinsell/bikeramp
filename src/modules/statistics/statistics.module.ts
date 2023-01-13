import { Module } from '@nestjs/common'
import { GetWeeklyStatsService } from './commands/get-weekly-stats/get-weekly.stats.service'
import { GetWeeklyStatsController } from './commands/get-weekly-stats/get-weekly-stats.controller'
import { TripModule } from '../trips/trip.module'
import { GetMonthlyStatsController } from './commands/get-monthly-stats/get-monthly-stats.controller'
import { GetMonthlyStatsService } from './commands/get-monthly-stats/get-monthly-stats.service'

@Module({
  imports: [TripModule],
  controllers: [GetWeeklyStatsController, GetMonthlyStatsController],
  providers: [GetWeeklyStatsService, GetMonthlyStatsService],
})
export class StatisticsModule {}
