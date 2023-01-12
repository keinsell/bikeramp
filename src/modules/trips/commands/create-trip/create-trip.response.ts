import { ApiProperty } from '@nestjs/swagger'

export class CreateTripResponse {
  @ApiProperty({
    description: 'Trip ID',
    example: 'cl1234',
  })
  id: string
  @ApiProperty({
    description: 'Date in format `2020-12-31`',
    example: '2020-12-31',
  })
  date: Date
  @ApiProperty({
    description: 'Starting address in format `Plac Europejski 2, Warszawa, Polska`',
    example: 'Plac Europejski 2, Warszawa, Polska',
  })
  startAddress: string
  @ApiProperty({
    description: 'Destination address in format `Plac Europejski 13, Warszawa, Polska`',
    example: 'Plac Europejski 13, Warszawa, Polska',
  })
  endAddress: string
  @ApiProperty({
    description: 'Package price in PLN',
    example: 100,
  })
  price: string
  @ApiProperty({
    description: 'Distance in format `1.2 km`',
    example: '1.2 km',
  })
  distance: string
}
