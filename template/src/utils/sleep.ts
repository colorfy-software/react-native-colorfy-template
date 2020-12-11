/**
 * As the name suggests, `sleep` allows you to pause your code execution for a given amount of time
 * @param milliseconds - Amount of time in ms to wait before resuming with JavaScript call stack
 */
export default function (milliseconds: number): Promise<Function> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}
