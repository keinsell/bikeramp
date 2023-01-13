import { DomainError } from '../../../common/domain/error/error.common'

export class InvalidAddressError extends DomainError {
  public constructor(message = 'Provided address is either invalid or does not exist.', cause?: Error) {
    super(message, cause)
  }
}
