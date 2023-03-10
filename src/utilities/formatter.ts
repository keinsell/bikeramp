import { Distance } from '../modules/geocoding/entities/distance'

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Formatter {
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
