import { PLN } from '@dinero.js/currencies'
import { Money } from './money'

describe('Money', () => {
  it('should return money in float', () => {
    const money = new Money(100, PLN)
    expect(money.toFloat()).toBe(1)
  })

  it('should return money in string', () => {
    const money = Money.fromFloat(1, PLN)
    expect(money.toString()).toBe('1.00PLN')
  })
})
