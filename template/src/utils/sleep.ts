/**
 * As the name suggests, `sleep` allows you to pause your code execution for a given amount of time
 * @param milliseconds - Amount of time in ms to wait before resuming with JavaScript call stack
 */
export default function (milliseconds: number): Promise<Promise<void>> {
  if (
    !milliseconds ||
    // NOTE: This is necessary to assert that `milliseconds` isn't a string of letters for instance,
    // which ironically returns `true` with `Number.isNan()`
    Number.isNaN(Number.parseInt(String(milliseconds), 10))
  ) {
    throw Error(`${milliseconds} is not a valid number, which sleep() expects`)
  }
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
