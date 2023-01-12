import { Controller, Post } from '@nestjs/common'
import { CreateTripService } from './create-trip.service'

@Controller()
export class CreateTripController {
  constructor(private readonly service: CreateTripService) {}

  @Post('/api/trips')
  getHello(): string {
    return this.appService.getHello()
  }
}
