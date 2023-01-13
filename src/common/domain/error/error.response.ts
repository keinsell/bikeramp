import { ApiProperty } from '@nestjs/swagger'

export class ErrorResponse {
  @ApiProperty({
    description: 'Error message',
    example: 'Provided address is invalid.',
  })
  message: string
}
