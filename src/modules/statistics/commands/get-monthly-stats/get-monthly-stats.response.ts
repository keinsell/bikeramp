import { ApiProperty } from '@nestjs/swagger'
import { Money } from '../../../trips/entities/money'
import { Distance } from '../../../geocoding/entities/distance'

export class GetMonthlyStatsResponse {
  @ApiProperty({
    example: 'July, 4th',
  })
  day: string

  @ApiProperty({
    description: 'Distance in format `1.2 km`',
    example: Distance.fromMeters(Math.random() * 10000).toString(),
  })
  total_distance: string

  @ApiProperty({
    description: 'Average ride distance',
    example: Distance.fromMeters(Math.random() * 1000).toString(),
  })
  avg_ride: string

  @ApiProperty({
    description: 'Average price.',
    example: Money.fromFloat(Math.random() * 1000).toString(),
  })
  avg_price: string
}
