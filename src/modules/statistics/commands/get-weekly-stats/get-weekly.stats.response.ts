import { ApiProperty } from '@nestjs/swagger'
import { Distance } from '../../../geocoding/entities/distance'
import { Money } from '../../../trips/entities/money'
import { PLN } from '@dinero.js/currencies'

export class GetWeeklyStatsResponse {
  @ApiProperty({
    description: 'Package price in PLN',
    example: Money.fromFloat(Math.random() * 1000).toString(),
  })
  total_price: string

  @ApiProperty({
    description: 'Distance',
    example: Distance.fromMeters(Math.random() * 1000).toString(),
  })
  total_distance: string
}
