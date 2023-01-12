import { Body, Controller, Post } from '@nestjs/common'
import { CreateTripService } from './create-trip.service'
import { ControllerExecutor } from 'src/common/controller'
import { CreateTripResponse } from './create-trip.response'
import { CreateTripRequest } from './create-trip.request'
import { ApiCreatedResponse } from '@nestjs/swagger'

/** This endpoint logs the trip and automatically calculates the distance between start and destination addresses. */
@Controller()
export class CreateTripController extends ControllerExecutor {
  constructor(private readonly service: CreateTripService) {
    super()
  }

  @Post('/api/trips')
  @ApiCreatedResponse({ description: 'Successfully saved trip.', type: CreateTripResponse })
  async executeImplementation(@Body() body: CreateTripRequest): Promise<CreateTripResponse> {
    // I'm going to be honest, I do not know good validation practices in NestJS.
    // So I'll do such in most "genric" idea that I have in my head.

    // TODO: Validate body
    // TODO: Execute service
    const response = await this.service.execute(body)
    // TODO: Return either result or error

    return response
  }
}
