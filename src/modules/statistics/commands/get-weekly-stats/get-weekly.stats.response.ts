import { ApiProperty } from '@nestjs/swagger'

export class GetWeeklyStatsResponse {
  @ApiProperty({
    description: 'Package price in PLN',
    example: '1000.00 PLN',
  })
  total_price: string

  @ApiProperty({
    description: 'Distance in format `1.2 km`',
    example: '252.17 km',
  })
  total_distance: string
}
