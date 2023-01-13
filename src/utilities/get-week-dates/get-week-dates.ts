export function getStartAndEndDateOfCurrentWeek(): { start: Date; end: Date } {
  const currentDate = new Date()
  const day = currentDate.getDay()
  const diff = currentDate.getDate() - day + (day === 0 ? -6 : 1)
  const start = new Date(currentDate.setDate(diff))
  const end = new Date(currentDate.setDate(diff + 6))
  return { start, end }
}
