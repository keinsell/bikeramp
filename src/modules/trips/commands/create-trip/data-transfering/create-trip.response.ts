import { ApiProperty } from '@nestjs/swagger'
import { Distance } from '../../../../geocoding/entities/distance'
import { Money } from '../../../entities/money'

export class CreateTripResponse {
  @ApiProperty({
    description: 'Trip ID',
    example: 'clct8aeyk0006pmrmp8b3ixro',
  })
  id: string

  @ApiProperty({
    description: 'Date in ISO format',
    example: new Date().toISOString(),
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
    example: Money.fromFloat(Math.random() * 1000).toString(),
  })
  price: string

  @ApiProperty({
    description: 'Distance in format `1.2 km`',
    example: Distance.fromMeters(Math.random() * 1000).toString(),
  })
  distance: string
}
