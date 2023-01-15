import { PLN } from '@dinero.js/currencies'
import { Currency, Dinero, dinero, toDecimal } from 'dinero.js'
import { Formatter } from '../../../utilities/formatter'

export class Money {
  private readonly baseAmount: Dinero<number>

  constructor(baseAmount: number, public readonly currency: Currency<number>) {
    if (baseAmount < 0) {
      throw new Error('Money amount cannot be negative')
    }

    if (currency !== PLN) {
      throw new Error('Money currency must be PLN')
    }

    this.baseAmount = dinero({ amount: baseAmount, currency })
  }

  static fromFloat(amount: number, currency: Currency<number> = PLN): Money {
    const amountInGrosze = amount * 100
    const amountInGroszeRounded = Math.round(amountInGrosze)
    return new Money(amountInGroszeRounded, currency)
  }

  toString(): string {
    return Formatter.formatFiat(parseFloat(toDecimal(this.baseAmount)))
  }

  toFloat(): number {
    return parseFloat(toDecimal(this.baseAmount))
  }
}
