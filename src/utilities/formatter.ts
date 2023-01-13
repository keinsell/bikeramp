import { PLN } from '@dinero.js/currencies'
import { dinero, toDecimal } from 'dinero.js'
import { Distance } from '../modules/geocoding/entities/distance/distance'

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Formatter {
  export function formatFiat(fiat: number) {
    return toDecimal(
      dinero({ amount: Number.parseFloat(fiat.toFixed(2)) * 100, currency: PLN }),
      ({ value, currency }) => `${value}${currency.code}`,
    )
  }
  export function formatDistance(distance: number) {
    return new Distance(distance).toString()
  }

  export function formatDateToMonthAndDayOfMonthFormat(date: Date) {
    const month = date.toLocaleString('default', { month: 'long' })
    const day = date.getDate()

    if (day === 1) {
      return `${month}, ${day}st`
    }

    if (day === 2) {
      return `${month}, ${day}nd`
    }

    if (day === 3) {
      return `${month}, ${day}rd`
    }

    return `${month}, ${day}th`
  }
}
