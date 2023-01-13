import { getStartAndEndDateOfCurrentWeek } from './get-week-dates'

describe('getStartAndEndDateOfCurrentWeek', () => {
  it('should return start and end date of current week', () => {
    const { start, end } = getStartAndEndDateOfCurrentWeek()
    expect(start).toBeInstanceOf(Date)
    expect(end).toBeInstanceOf(Date)
  })

  it('should return start and end date of current week', () => {
    const { start, end } = getStartAndEndDateOfCurrentWeek()
    expect(start).toBeInstanceOf(Date)
    expect(end).toBeInstanceOf(Date)

    const startDay = start.getDay()
    const endDay = end.getDay()

    expect(startDay).toBe(1)
    expect(endDay).toBe(0)

    const startDayDate = start.getDate()
    const endDayDate = end.getDate()

    expect(startDayDate).toBeLessThan(endDayDate)
  })
})
