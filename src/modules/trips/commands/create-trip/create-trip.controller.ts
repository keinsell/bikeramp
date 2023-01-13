import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import { CreateTripService } from './create-trip.service'
import { CreateTripResponse } from './data-transfering/create-trip.response'
import { CreateTripRequest } from './data-transfering/create-trip.request'
import { ApiCreatedResponse } from '@nestjs/swagger'
import { ControllerExecutor } from '../../../../common/controller'

/** This endpoint logs the trip and automatically calculates the distance between start and destination addresses. */
@Controller()
export class CreateTripController extends ControllerExecutor {
  constructor(private readonly service: CreateTripService) {
    super()
  }

  @Post('/api/trips')
  @ApiCreatedResponse({ description: 'Successfully saved trip.', type: CreateTripResponse })
  async executeImplementation(@Body() body: CreateTripRequest): Promise<CreateTripResponse> {
    const response = await this.service.execute(body)

    if (response.isErr()) {
      throw new BadRequestException(response.error.message, response.error.code)
    }

    return response.unwrapOr(undefined)
  }
}
