import { addMinutesToDate } from '../../src/utils/date'

describe('🧰 Utils > date:', () => {
  const date = new Date()
  const minutesToAdd = 5
  const amountOfMsInAMinute = 60_000

  it('addMinutesToDate() throws an error if an invalid Date instance is provided as 1st argument', () => {
    expect(() =>
      // @ts-expect-error NOTE: We know the argument isn't a Date
      addMinutesToDate(undefined, minutesToAdd),
    ).toThrowError()
    // @ts-expect-error NOTE: We know the argument isn't a Date
    expect(() => addMinutesToDate('a', minutesToAdd)).toThrowError()
    // @ts-expect-error NOTE: We know the argument isn't a Date
    expect(() => addMinutesToDate(null, minutesToAdd)).toThrowError()
    expect(() =>
      // @ts-expect-error NOTE: We know the argument isn't a Date
      addMinutesToDate(new Date() + 5, minutesToAdd),
    ).toThrowError()
    expect.assertions(4)
  })

  it('addMinutesToDate() throws an error if an invalid minutes value is provided as 2nd argument', () => {
    // @ts-expect-error NOTE: We know the argument isn't a number
    expect(() => addMinutesToDate(date, undefined)).toThrowError()
    // @ts-expect-error NOTE: We know the argument isn't a number
    expect(() => addMinutesToDate(date, 'a')).toThrowError()
    // @ts-expect-error NOTE: We know the argument isn't a number
    expect(() => addMinutesToDate(date, null)).toThrowError()
    expect.assertions(3)
  })

  it('addMinutesToDate() adds a given amount of time to a given Date', () => {
    const newDate = addMinutesToDate(date, minutesToAdd)
    expect((newDate.getTime() - date.getTime()) / amountOfMsInAMinute).toEqual(
      minutesToAdd,
    )
  })
})
