import { Body, Controller, Get, Post } from '@nestjs/common'

import { ApiCreatedResponse } from '@nestjs/swagger'
import { ControllerExecutor } from '../../../../common/controller'
import { GetWeeklyStatsService } from './get-weekly.stats.service'
import { GetWeeklyStatsResponse } from './get-weekly.stats.response'

/** This endpoint logs the trip and automatically calculates the distance between start and destination addresses. */
@Controller()
export class GetWeeklyStatsController extends ControllerExecutor {
  constructor(private readonly service: GetWeeklyStatsService) {
    super()
  }

  @Get('/api/stats/weekly')
  async executeImplementation(): Promise<GetWeeklyStatsResponse> {
    const response = await this.service.execute(undefined)
    return response
  }
}
