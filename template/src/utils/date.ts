/**
 * Add minutes to date
 * @param date - Date you want to add minutes to
 * @param minutes - amount of minutes
 * @example const inFiveMinutes = addMinutesToDate(new Date(), 5)
 */
export function addMinutesToDate(date: Date, minutes: number): Date {
  if (!date || !(date instanceof Date && Number.isFinite(Date.parse(String(date))))) {
    throw Error(`${date} is not a valid Date instance, which addMinutesToDate() expects as 1st argument`)
  }
  if (
    !minutes ||
    // NOTE: This is necessary to assert that `minutes` isn't a string of letters for instance,
    // which ironically returns `true` with `Number.isNan()`
    Number.isNaN(Number.parseInt(String(minutes), 10))
  ) {
    throw Error(`${minutes} is not a valid number, which addMinutesToDate() expects as 2nd argument`)
  }
  return new Date(new Date(date).getTime() + minutes * 60000)
}
