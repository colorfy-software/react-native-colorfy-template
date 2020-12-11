/**
 * Add minutes to date
 * @param date - Date you want to add minutes to
 * @param minutes - amount of minutes
 * @example const inFiveMinutes = addMinutesToDate(new Date(), 5)
 */
export function addMinutesToDate(date: Date, minutes: number): Date {
  return new Date(new Date(date).getTime() + minutes * 60000)
}
