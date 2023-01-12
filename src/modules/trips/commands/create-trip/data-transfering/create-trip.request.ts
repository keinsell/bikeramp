import { IsNotEmpty, IsDateString } from 'class-validator'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

export class CreateTripRequest {
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Starting address in format `Plac Europejski 2, Warszawa, Polska`',
    example: 'Plac Europejski 2, Warszawa, Polska',
  })
  public start_address: string

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Destination address in format `Plac Europejski 13, Warszawa, Polska`',
    example: 'Plac Europejski 13, Warszawa, Polska',
  })
  public destination_address: string

  @IsNotEmpty()
  @Type(() => Number)
  @ApiProperty({
    type: Number,
    description: 'Package price in PLN',
    example: 100,
  })
  public price: number

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({
    type: Date,
    description: 'Date in format `2020-12-31`',
    example: '2020-12-31',
  })
  public date: Date
}
