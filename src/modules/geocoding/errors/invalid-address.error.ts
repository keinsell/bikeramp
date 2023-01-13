import { DomainError } from '../../../common/domain/error/error.common'

export class InvalidAddressError extends DomainError {
  public constructor(message = 'Provided is invalid.', cause?: Error) {
    super(message, cause)
  }
}
