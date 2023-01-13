import { ApiProperty } from '@nestjs/swagger'

export class GetMonthlyStatsResponse {
  @ApiProperty({
    example: 'July, 4th',
  })
  day: string

  @ApiProperty({
    description: 'Distance in format `1.2 km`',
    example: '252.17 km',
  })
  total_distance: string

  @ApiProperty({
    description: 'Average ride distance',
    example: '1.22 km',
  })
  avg_ride: string

  @ApiProperty({
    description: 'Average price.',
    example: '1000.00 PLN',
  })
  avg_price: string
}
