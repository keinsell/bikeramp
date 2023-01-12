import { Body, Controller, Post } from '@nestjs/common'
import { CreateTripService } from './create-trip.service'
import { ControllerExecutor } from 'src/common/controller'
import { CreateTripResponse } from './create-trip.response'

@Controller()
export class CreateTripController extends ControllerExecutor {
  constructor(private readonly service: CreateTripService) {
    super()
  }

  @Post('/api/trips')
  async executeImplementation(@Body() body: CreateTripService): Promise<CreateTripResponse> {
    // I'm going to be honest, I do not know good validation practices in NestJS.
    // So I'll do such in most "genric" idea that I have in my head.

    // TODO: Validate body
    // TODO: Execute service
    const response = await this.service.execute(body)
    // TODO: Return either result or error

    return response
  }
}
