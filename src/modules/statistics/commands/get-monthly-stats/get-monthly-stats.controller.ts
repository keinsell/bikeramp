import { Controller, Get } from '@nestjs/common'

import { ApiCreatedResponse } from '@nestjs/swagger'
import { ControllerExecutor } from '../../../../common/controller'
import { GetMonthlyStatsService } from './get-monthly-stats.service'
import { GetMonthlyStatsResponse } from './get-monthly-stats.response'

@Controller()
export class GetMonthlyStatsController extends ControllerExecutor {
  constructor(private readonly service: GetMonthlyStatsService) {
    super()
  }

  @Get('/api/stats/monthly')
  @ApiCreatedResponse({
    description: 'Get monthly stats',
    isArray: true,
    type: GetMonthlyStatsResponse,
  })
  async executeImplementation(): Promise<GetMonthlyStatsResponse[]> {
    const response = await this.service.execute()
    return response
  }
}
