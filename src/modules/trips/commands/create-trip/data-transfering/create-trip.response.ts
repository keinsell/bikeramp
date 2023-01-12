import { ApiProperty } from '@nestjs/swagger'

export class CreateTripResponse {
  @ApiProperty({
    description: 'Trip ID',
    example: 'clct8aeyk0006pmrmp8b3ixro',
  })
  id: string

  @ApiProperty({
    description: 'Date in ISO format',
    example: '2020-12-31T00:00:00.000Z',
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
    example: '1000.00 PLN',
  })
  price: string

  @ApiProperty({
    description: 'Distance in format `1.2 km`',
    example: '252.17 km',
  })
  distance: string
}
